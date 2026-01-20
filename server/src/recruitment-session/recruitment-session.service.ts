/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RecruitmentSession,
  RecruitmentSessionDocument,
} from 'src/schemas/recruitment-session.schema';
import { CreateRecruitmentSessionDto } from './dto/create-recruitment-session.dto';
import { UpdateRecruitmentSessionDto } from './dto/update-recruitment-session.dto';

@Injectable()
export class RecruitmentSessionService {
  constructor(
    @InjectModel(RecruitmentSession.name)
    private recruitmentSessionModel: Model<RecruitmentSessionDocument>,
  ) {}

  async create(
    createDto: CreateRecruitmentSessionDto,
  ): Promise<RecruitmentSession> {
    const startDate = new Date(createDto.startDate);
    const endDate = new Date(createDto.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    const createdSession = new this.recruitmentSessionModel({
      ...createDto,
      startDate,
      endDate,
    });
    return createdSession.save();
  }

  async findAll(): Promise<RecruitmentSession[]> {
    return this.recruitmentSessionModel.find().exec();
  }

  async findOne(id: string): Promise<RecruitmentSession> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }
    const session = await this.recruitmentSessionModel.findById(id).exec();
    if (!session) {
      throw new NotFoundException(`RecruitmentSession with ID ${id} not found`);
    }
    return session;
  }

  async update(
    id: string,
    updateDto: UpdateRecruitmentSessionDto,
  ): Promise<RecruitmentSession> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }

    const updateData: any = { ...updateDto };

    if (updateDto.startDate) {
      updateData.startDate = new Date(updateDto.startDate);
      if (isNaN(updateData.startDate.getTime())) {
        throw new BadRequestException('Invalid start date format');
      }
    }

    if (updateDto.endDate) {
      updateData.endDate = new Date(updateDto.endDate);
      if (isNaN(updateData.endDate.getTime())) {
        throw new BadRequestException('Invalid end date format');
      }
    }

    if (
      updateData.startDate &&
      updateData.endDate &&
      updateData.startDate >= updateData.endDate
    ) {
      throw new BadRequestException('Start date must be before end date');
    }

    // If only one date is updated, check against existing
    if (updateData.startDate || updateData.endDate) {
      const existing = await this.recruitmentSessionModel.findById(id).exec();
      if (!existing) {
        throw new NotFoundException(
          `RecruitmentSession with ID ${id} not found`,
        );
      }
      const start = updateData.startDate || existing.startDate;
      const end = updateData.endDate || existing.endDate;
      if (start >= end) {
        throw new BadRequestException('Start date must be before end date');
      }
    }

    const updatedSession = await this.recruitmentSessionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedSession) {
      throw new NotFoundException(`RecruitmentSession with ID ${id} not found`);
    }
    return updatedSession;
  }

  async remove(id: string): Promise<void> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }
    const result = await this.recruitmentSessionModel
      .findByIdAndDelete(id)
      .exec();
    if (!result) {
      throw new NotFoundException(`RecruitmentSession with ID ${id} not found`);
    }
  }
}
