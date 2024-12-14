import {
  MulterField,
  MulterOptions,
} from './../../node_modules/@nestjs/platform-express/multer/interfaces/multer-options.interface.d';
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCandidatureDto } from './dto/create-candidature.dto';
import { UpdateCandidatureDto } from './dto/update-candidature.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candidature } from 'src/schemas/candidature.schema';
import { Model } from 'mongoose';
import { FileUploadService } from 'src/common/services/file-upload.service';

@Injectable()
export class CandidatureService {
  constructor(
    @InjectModel(Candidature.name)
    private candidatureModel: Model<Candidature>,
    private fileUploadService: FileUploadService,
  ) {}

  //-------------------------------------------------------------------------
  // Save Personal information
  async savePersonalInformations(
    createCandidaturedto: CreateCandidatureDto,
    files: any,
  ) {
    console.log(createCandidaturedto);
    console.log(files);

    return files;

    // try {
    //   const createdCandidature = new this.candidatureModel(
    //     createCandidaturedto,
    //   );

    //   return await createdCandidature.save();
    // } catch (error) {
    //   throw new InternalServerErrorException(error);
    // }
  }
  // ----------------------------------------------------------------------------

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
