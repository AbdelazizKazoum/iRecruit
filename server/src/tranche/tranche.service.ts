/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tranche, TrancheDocument } from 'src/schemas/tranche.schema';
import { CreateTrancheDto } from './dto/create-tranche.dto';
import { UpdateTrancheDto } from './dto/update-tranche.dto';

@Injectable()
export class TrancheService {
  constructor(
    @InjectModel(Tranche.name) private trancheModel: Model<TrancheDocument>,
  ) {}

  async create(createTrancheDto: CreateTrancheDto): Promise<Tranche> {
    const startDate = new Date(createTrancheDto.startDate);
    const endDate = new Date(createTrancheDto.endDate);

    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    const createdTranche = new this.trancheModel({
      ...createTrancheDto,
      startDate,
      endDate,
    });
    return createdTranche.save();
  }

  async findAll(): Promise<Tranche[]> {
    return this.trancheModel
      .find()
      .populate('session')
      .populate('jobOffer')
      .exec();
  }

  async findOne(id: string): Promise<Tranche> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }

    const tranche = await this.trancheModel
      .findById(id)
      .populate('session')
      .populate('jobOffer')
      .exec();

    if (!tranche) {
      throw new NotFoundException(`Tranche with ID ${id} not found`);
    }

    return tranche;
  }

  async update(
    id: string,
    updateTrancheDto: UpdateTrancheDto,
  ): Promise<Tranche> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }

    const updateData: any = { ...updateTrancheDto };

    if (updateTrancheDto.startDate) {
      updateData.startDate = new Date(updateTrancheDto.startDate);
    }
    if (updateTrancheDto.endDate) {
      updateData.endDate = new Date(updateTrancheDto.endDate);
    }

    // Check dates consistency if one or both are provided
    if (updateData.startDate || updateData.endDate) {
      const existingTranche = await this.trancheModel.findById(id).exec();
      if (!existingTranche) {
        throw new NotFoundException(`Tranche with ID ${id} not found`);
      }

      const start = updateData.startDate || existingTranche.startDate;
      const end = updateData.endDate || existingTranche.endDate;

      if (new Date(start) >= new Date(end)) {
        throw new BadRequestException('Start date must be before end date');
      }
    }

    const updatedTranche = await this.trancheModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('session')
      .populate('jobOffer')
      .exec();

    if (!updatedTranche) {
      throw new NotFoundException(`Tranche with ID ${id} not found`);
    }

    return updatedTranche;
  }

  async remove(id: string): Promise<void> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }

    const result = await this.trancheModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Tranche with ID ${id} not found`);
    }
  }

  async findBySession(sessionId: string): Promise<Tranche[]> {
    if (!sessionId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid Session ID format');
    }
    return this.trancheModel
      .find({ session: sessionId })
      .populate('jobOffer')
      .exec();
  }
}
