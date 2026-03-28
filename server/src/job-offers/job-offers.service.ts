import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { FindJobOffersQueryDto } from './dto/find-job-offers-query.dto';
import { JobOffer, JobOfferDocument } from 'src/schemas/JobOffer.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { ApplicationsService } from 'src/applications/applications.service';
import { FileUploadService } from 'src/common/services/file-upload.service';

@Injectable()
export class JobOffersService {
  constructor(
    @InjectModel(JobOffer.name) private jobOfferModel: Model<JobOfferDocument>,
    private applicationsService: ApplicationsService,
    private fileUploadService: FileUploadService,
  ) {}

  private async resolveImageUrl(files?: any[]) {
    if (!files || files.length === 0) {
      return null;
    }
    const uploadPath = 'uploads/job-offers';
    const uploadedFiles = await this.fileUploadService.uploadFiles(
      files,
      uploadPath,
      ['png', 'jpg', 'jpeg', 'webp'],
    );
    const filePath = Object.values(uploadedFiles)[0];
    if (!filePath) {
      return null;
    }
    const normalized = filePath.replace(/\\/g, '/');
    return normalized.startsWith('/') ? normalized : `/${normalized}`;
  }

  async create(
    createJobOfferDto: CreateJobOfferDto,
    user?: UserDocument,
    files?: any[],
  ): Promise<JobOffer> {
    if (!user?._id) {
      throw new BadRequestException('Owner is required to create a job offer');
    }
    const imageUrl = await this.resolveImageUrl(files);
    if (!imageUrl && !createJobOfferDto?.imageUrl) {
      throw new BadRequestException('Image is required to create a job offer');
    }
    const createdJobOffer = new this.jobOfferModel({
      ...createJobOfferDto,
      imageUrl: imageUrl || createJobOfferDto.imageUrl,
      owner: user._id,
    });
    return createdJobOffer.save();
  }

  async findAll(user?: UserDocument): Promise<JobOffer[]> {
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

  async findOne(id: string): Promise<JobOffer> {
    const offer = await this.jobOfferModel.findById(id).exec();
    if (!offer) {
      throw new NotFoundException('Job offer not found');
    }
    return offer;
  }

  async update(
    id: string,
    updateJobOfferDto: UpdateJobOfferDto,
    files?: any[],
  ): Promise<JobOffer> {
    const imageUrl = await this.resolveImageUrl(files);
    const payload = {
      ...updateJobOfferDto,
      ...(imageUrl ? { imageUrl } : {}),
    };
    return this.jobOfferModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
  }

  async remove(id: string): Promise<JobOffer> {
    return this.jobOfferModel.findByIdAndDelete(id).exec();
  }
}
