import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { JobOffer, JobOfferDocument } from 'src/schemas/JobOffer.schema';

@Injectable()
export class JobOffersService {
  constructor(
    @InjectModel(JobOffer.name) private jobOfferModel: Model<JobOfferDocument>,
  ) {}

  async create(createJobOfferDto: CreateJobOfferDto): Promise<JobOffer> {
    const createdJobOffer = new this.jobOfferModel(createJobOfferDto);
    return createdJobOffer.save();
  }

  async findAll(): Promise<JobOffer[]> {
    return this.jobOfferModel.find().exec();
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
