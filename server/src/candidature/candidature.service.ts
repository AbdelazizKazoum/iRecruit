import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCandidatureDto } from './dto/create-candidature.dto';
import { UpdateCandidatureDto } from './dto/update-candidature.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candidature } from 'src/schemas/candidature.schema';
import { Model } from 'mongoose';

@Injectable()
export class CandidatureService {
  constructor(
    @InjectModel(Candidature.name)
    private candidatureModel: Model<Candidature>,
  ) {}

  async create(
    createCandidaturedto: CreateCandidatureDto,
  ): Promise<Candidature> {
    try {
      const createdCandidature = new this.candidatureModel(
        createCandidaturedto,
      );
      return await createdCandidature.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Candidature[]> {
    return this.candidatureModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} candidature`;
  }

  update(id: number, updateCandidatureDto: UpdateCandidatureDto) {
    return `This action updates a #${id} candidature`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidature`;
  }
}
