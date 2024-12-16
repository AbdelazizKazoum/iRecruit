/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PersonalInformationDto } from './dto/create-candidature.dto';
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
  // Save Personal Information
  async savePersonalInformations(
    personalInformationDto: PersonalInformationDto,
    files: any,
    user: any, // The user object passed in the request
  ) {
    const { cin } = personalInformationDto;

    // Define upload path dynamically
    const uploadPath = `uploads/candidats/${cin}`;
    const allowedFormats = ['pdf']; // Define allowed formats

    // Upload files and get their paths
    const filePaths = await this.fileUploadService.uploadFiles(
      files,
      uploadPath,
      allowedFormats,
    );

    // Check if a candidature already exists for the given user
    const existingCandidature = await this.candidatureModel.findOne({
      user: user._id,
    });

    if (existingCandidature) {
      // Update only the personalInformation field and preserve professionalInformation
      existingCandidature.personalInformation = {
        ...personalInformationDto,
        files: filePaths,
      };

      // Save the updated candidature
      return existingCandidature.save();
    }

    // If no existing candidature, create a new one
    const newCandidature = new this.candidatureModel({
      user: user._id, // Associate with the user
      personalInformation: {
        ...personalInformationDto,
        files: filePaths,
      },
      professionalInformation: {}, // Initialize empty professionalInformation
    });

    return newCandidature.save();
  }

  // ----------------------------------------------------------------------------

  async findAll(): Promise<Candidature[]> {
    return this.candidatureModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} candidature`;
  }

  // update(id: number, updateCandidatureDto: PersonalInformationDto) {
  //   return `This action updates a #${id} candidature`;
  // }

  remove(id: number) {
    return `This action removes a #${id} candidature`;
  }
}
