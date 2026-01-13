import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { FindJobOffersQueryDto } from './dto/find-job-offers-query.dto';
import { JobOffer, JobOfferDocument } from 'src/schemas/JobOffer.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { ApplicationsService } from 'src/applications/applications.service';

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

  async findAll(user: UserDocument): Promise<JobOffer[]> {
    // Retrieve all job offers
    const offers = await this.jobOfferModel.find().exec();

    if (user) {
      // Retrieve user applications
      const userApplications =
        await this.applicationsService.findUserApplication(user);

      // Extract all offer IDs from user applications as ObjectIds
      const userOfferIds = userApplications.map(
        (application: any) =>
          application.offer instanceof Types.ObjectId
            ? application.offer.toString() // Ensure it's a string
            : new Types.ObjectId(application.offer as string).toString(), // Handle edge case if offer is not an ObjectId
      );

      // Filter out offers already applied for
      return offers.filter((offer: JobOfferDocument) => {
        const offerId = offer._id.toString(); // Ensure this is also a string

        // Return only offers that are not in userOfferIds
        return !userOfferIds.includes(offerId);
      });
    } else {
      // Return all offers if no user is provided
      return offers;
    }
  }

  async findAllWithFilters(query: FindJobOffersQueryDto) {
    const { page = 1, limit = 10, title, date, city, department } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (title) {
      filter.$or = [
        { 'title.fr': { $regex: title, $options: 'i' } },
        { 'title.en': { $regex: title, $options: 'i' } },
        { 'title.ar': { $regex: title, $options: 'i' } },
      ];
    }

    if (date) {
      filter.datePublication = date;
    }

    if (city) {
      if (filter.$or) {
        filter.$and = [
          { $or: filter.$or },
          {
            $or: [
              { 'city.fr': { $regex: city, $options: 'i' } },
              { 'city.en': { $regex: city, $options: 'i' } },
              { 'city.ar': { $regex: city, $options: 'i' } },
            ],
          },
        ];
        delete filter.$or;
      } else {
        filter.$or = [
          { 'city.fr': { $regex: city, $options: 'i' } },
          { 'city.en': { $regex: city, $options: 'i' } },
          { 'city.ar': { $regex: city, $options: 'i' } },
        ];
      }
    }

    if (department) {
      if (filter.$or) {
        filter.$and = [
          { $or: filter.$or },
          {
            $or: [
              { 'department.fr': { $regex: department, $options: 'i' } },
              { 'department.en': { $regex: department, $options: 'i' } },
              { 'department.ar': { $regex: department, $options: 'i' } },
            ],
          },
        ];
        delete filter.$or;
      } else {
        filter.$or = [
          { 'department.fr': { $regex: department, $options: 'i' } },
          { 'department.en': { $regex: department, $options: 'i' } },
          { 'department.ar': { $regex: department, $options: 'i' } },
        ];
      }
    }

    const total = await this.jobOfferModel.countDocuments(filter).exec();
    const data = await this.jobOfferModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
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
