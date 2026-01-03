/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { JobOffer, JobOfferDocument } from 'src/schemas/JobOffer.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { ApplicationsService } from 'src/applications/applications.service';

type JobOfferFilters = {
  search?: string;
  region?: string;
  published?: string;
  page?: string;
  limit?: string;
};

@Injectable()
export class JobOffersService {
  constructor(
    @InjectModel(JobOffer.name) private jobOfferModel: Model<JobOfferDocument>,
    private applicationsService: ApplicationsService,
  ) {}

  async create(createJobOfferDto: CreateJobOfferDto): Promise<JobOffer> {
    const createdJobOffer = new this.jobOfferModel(createJobOfferDto);
    return createdJobOffer.save();
  }

  async findAll(
    user: UserDocument,
    filters: JobOfferFilters = {},
  ): Promise<{
    data: JobOffer[];
    total: number;
    page: number;
    limit: number;
  }> {
    // Retrieve all job offers
    const offers = await this.jobOfferModel.find().exec();

    const search = filters.search ? filters.search.toLowerCase().trim() : '';
    const region = filters.region ? filters.region.trim() : '';
    const published = filters.published ? filters.published.trim() : '';
    const page = Math.max(parseInt(filters.page || '1', 10) || 1, 1);
    const limit = Math.max(parseInt(filters.limit || '12', 10) || 12, 1);

    // Apply filters in memory (keeps logic simple while schema stores strings)
    let filtered = offers.filter((offer: JobOfferDocument) => {
      const matchesSearch =
        !search ||
        [
          offer.title?.fr,
          offer.title?.en,
          offer.title?.ar,
          offer.description?.fr,
          offer.description?.en,
          offer.description?.ar,
          offer.tag?.fr,
          offer.tag?.en,
          offer.tag?.ar,
          (offer as any).specialite?.fr,
          (offer as any).specialite?.en,
          (offer as any).specialite?.ar,
          offer.department?.fr,
          offer.department?.en,
          offer.department?.ar,
        ]
          .filter(Boolean)
          .some((field: string) => field.toLowerCase().includes(search));

      const matchesRegion =
        !region ||
        [
          offer.city?.fr,
          offer.city?.en,
          offer.city?.ar,
          offer.department?.fr,
          offer.department?.en,
          offer.department?.ar,
        ]
          .filter(Boolean)
          .some((field: string) => field === region);

      const matchesDate = (() => {
        if (!published) return true;
        const days = parseInt(published, 10);
        if (isNaN(days)) return true;
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        const publishedDate = offer.datePublication
          ? new Date(offer.datePublication)
          : null;
        return publishedDate ? publishedDate >= cutoff : false;
      })();

      return matchesSearch && matchesRegion && matchesDate;
    });

    // Remove offers already applied for by the user (if authenticated)
    if (user) {
      const userApplications =
        await this.applicationsService.findUserApplication(user);

      const userOfferIds = userApplications.map(
        (application: any) =>
          application.offer instanceof Types.ObjectId
            ? application.offer.toString() // Ensure it's a string
            : new Types.ObjectId(application.offer as string).toString(), // Handle edge case if offer is not an ObjectId
      );

      filtered = filtered.filter((offer: JobOfferDocument) => {
        const offerId = offer._id.toString();
        return !userOfferIds.includes(offerId);
      });
    }

    // Sort by publication date (newest first)
    filtered.sort((a, b) => {
      const dateA = a.datePublication ? new Date(a.datePublication).getTime() : 0;
      const dateB = b.datePublication ? new Date(b.datePublication).getTime() : 0;
      return dateB - dateA;
    });

    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<JobOffer> {
    return this.jobOfferModel.findById(id).exec();
  }

  async update(
    id: string,
    updateJobOfferDto: UpdateJobOfferDto,
  ): Promise<JobOffer> {
    return this.jobOfferModel
      .findByIdAndUpdate(id, updateJobOfferDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<JobOffer> {
    return this.jobOfferModel.findByIdAndDelete(id).exec();
  }
}
