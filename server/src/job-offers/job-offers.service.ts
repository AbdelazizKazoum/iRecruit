/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
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
