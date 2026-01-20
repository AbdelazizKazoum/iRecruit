/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const createdSession = new this.recruitmentSessionModel(createDto);
    return createdSession.save();
  }

  async findAll(): Promise<RecruitmentSession[]> {
    return this.recruitmentSessionModel.find().exec();
  }

  async findOne(id: string): Promise<RecruitmentSession> {
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
    const updatedSession = await this.recruitmentSessionModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updatedSession) {
      throw new NotFoundException(`RecruitmentSession with ID ${id} not found`);
    }
    return updatedSession;
  }

  async remove(id: string): Promise<void> {
    const result = await this.recruitmentSessionModel
      .findByIdAndDelete(id)
      .exec();
    if (!result) {
      throw new NotFoundException(`RecruitmentSession with ID ${id} not found`);
    }
  }
}
