/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
        valid: true,
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
        valid: true,
        ...personalInformationDto,
        files: filePaths,
      },
      professionalInformation: {
        valid: false,
        parcoursEtDiplomes: [],
        niveauxLangues: [],
        experiencePedagogique: [],
        publications: [],
        communications: [],
        residanat: [],
        autresDocuments: [],
      }, // Initialize empty professionalInformation
    });

    return newCandidature.save();
  }
  // ----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Save diplomes
  async saveDiplomes(data, files: any, user: any) {
    try {
      // Check if a candidature already exists for the given user
      const existingCandidature = await this.candidatureModel.findOne({
        user: user._id,
      });

      if (!existingCandidature) {
        throw new NotFoundException('Not found!');
      }

      // Define upload path dynamically
      const uploadPath = `uploads/candidats/${existingCandidature.personalInformation.cin}/diplomes`;
      const allowedFormats = ['pdf']; // Define allowed formats

      // Upload files and get their paths
      const filePaths = await this.fileUploadService.uploadFiles(
        files,
        uploadPath,
        allowedFormats,
      );

      // Update only the professionalInformation
      existingCandidature.professionalInformation = {
        ...existingCandidature.professionalInformation,
        parcoursEtDiplomes: [
          ...existingCandidature.professionalInformation.parcoursEtDiplomes,
          { ...data, files: filePaths },
        ],
      };

      // Save the updated candidature
      const savedCandidature = await existingCandidature.save(); // Make sure to await here

      return savedCandidature.professionalInformation.parcoursEtDiplomes;
    } catch (error) {
      console.error('Error saving candidature:', error);
      throw new InternalServerErrorException('Failed to save data');
    }
  }
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // Save languages
  async saveLanguages(data, files: any, user: any) {
    try {
      // Check if a candidature already exists for the given user
      const existingCandidature = await this.candidatureModel.findOne({
        user: user._id,
      });

      if (!existingCandidature) {
        throw new NotFoundException('Not found!');
      }

      // Define upload path dynamically
      const uploadPath = `uploads/candidats/${existingCandidature.personalInformation.cin}/languages`;
      const allowedFormats = ['pdf']; // Define allowed formats

      // Upload files and get their paths
      let filePaths = {};
      if (files.length > 0) {
        console.log('🚀 ~ CandidatureService ~ saveLanguages ~ files:', files);

        filePaths = await this.fileUploadService.uploadFiles(
          files,
          uploadPath,
          allowedFormats,
        );
      }

      // Update only the professionalInformation
      existingCandidature.professionalInformation = {
        ...existingCandidature.professionalInformation,
        niveauxLangues: [
          ...existingCandidature.professionalInformation.niveauxLangues,
          { ...data, files: filePaths },
        ],
      };

      // Save the updated candidature
      const savedCandidature = await existingCandidature.save(); // Make sure to await here

      return savedCandidature.professionalInformation.niveauxLangues;
    } catch (error) {
      console.error('Error saving languages:', error);
      throw new InternalServerErrorException('Failed to save data');
    }
  }
  //----------------------------------------------------------------------------
  // Save languages
  async savePublications(data, files: any, user: any) {
    try {
      // Check if a candidature already exists for the given user
      const existingCandidature = await this.candidatureModel.findOne({
        user: user._id,
      });

      if (!existingCandidature) {
        throw new NotFoundException('Not found!');
      }

      // Define upload path dynamically
      const uploadPath = `uploads/candidats/${existingCandidature.personalInformation.cin}/Publications`;
      const allowedFormats = ['pdf']; // Define allowed formats

      // Upload files and get their paths
      const filePaths = await this.fileUploadService.uploadFiles(
        files,
        uploadPath,
        allowedFormats,
      );

      // Update only the professionalInformation
      existingCandidature.professionalInformation = {
        ...existingCandidature.professionalInformation,
        publications: [
          ...existingCandidature.professionalInformation.publications,
          { ...data, files: filePaths },
        ],
      };

      // Save the updated candidature
      const savedCandidature = await existingCandidature.save(); // Make sure to await here

      return savedCandidature.professionalInformation.publications;
    } catch (error) {
      console.error('Error saving publications:', error);
      throw new InternalServerErrorException('Failed to save data');
    }
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  // Save languages
  async saveCommunications(data, files: any, user: any) {
    try {
      // Check if a candidature already exists for the given user
      const existingCandidature = await this.candidatureModel.findOne({
        user: user._id,
      });

      if (!existingCandidature) {
        throw new NotFoundException('Not found!');
      }

      // Define upload path dynamically
      const uploadPath = `uploads/candidats/${existingCandidature.personalInformation.cin}/communications`;
      const allowedFormats = ['pdf']; // Define allowed formats

      // Upload files and get their paths
      const filePaths = await this.fileUploadService.uploadFiles(
        files,
        uploadPath,
        allowedFormats,
      );

      // Update only the communications
      existingCandidature.professionalInformation = {
        ...existingCandidature.professionalInformation,
        communications: [
          ...existingCandidature.professionalInformation.communications,
          { ...data, files: filePaths },
        ],
      };

      // Save the updated candidature
      const savedCandidature = await existingCandidature.save(); // Make sure to await here

      return savedCandidature.professionalInformation.communications;
    } catch (error) {
      console.error('Error saving communication:', error);
      throw new InternalServerErrorException('Failed to save data');
    }
  }
  //----------------------------------------------------------------------------

  async findAll(): Promise<Candidature[]> {
    return this.candidatureModel.find().exec();
  }

  async findMyCandidature(user): Promise<Candidature> {
    try {
      return await this.candidatureModel.findOne({ user: user._id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateCandidature(user): Promise<Candidature> {
    try {
      // Update the candidature's professionalInformation field
      const updatedCandidature = await this.candidatureModel.findOneAndUpdate(
        { user: user._id }, // Match by user._id instead of _id
        { $set: { 'professionalInformation.valid': true } }, // Update professionalInformation.valid
        { new: true, runValidators: true }, // Return the updated document
      );

      if (!updatedCandidature) {
        throw new NotFoundException('Candidature or Language not found');
      }
      return updatedCandidature;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
