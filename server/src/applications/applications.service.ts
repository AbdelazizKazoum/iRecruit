/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from 'src/schemas/Applications.schema';
import { Candidature } from 'src/schemas/candidature.schema';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<Application>,

    @InjectModel(Candidature.name)
    private candidatureModel: Model<Candidature>,

    private fileUploadService: FileUploadService,
  ) {}

  // Create a new application
  async create(data, files: any, user: any): Promise<Application> {
    try {
      // Check if a candidature already exists for the given user
      const existingCandidature = await this.candidatureModel.findOne({
        user: user._id,
      });

      if (!existingCandidature) {
        throw new NotFoundException('Not found!');
      }

      // Define upload path dynamically
      const uploadPath = `uploads/candidats/${existingCandidature.personalInformation.cin}/applications`;
      const allowedFormats = ['pdf']; // Define allowed formats

      // Upload files and get their paths
      const filePaths = await this.fileUploadService.uploadFiles(
        files,
        uploadPath,
        allowedFormats,
      );

      const createApplication = new this.applicationModel({
        ...data,
        user: user,
        offer: new Types.ObjectId(data.offer._id as string), // Extract the _id and convert to ObjectId
        attachment: filePaths,
      });

      // Save the updated candidature

      return await createApplication.save(); // Make sure to await here
    } catch (error) {
      console.error('Error saving candidature:', error);
      throw new InternalServerErrorException('Failed to save data');
    }
  }

  // Get all applications
  async findAll(): Promise<Application[]> {
    try {
      const applications = await this.applicationModel.find().exec();
      return applications;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve applications',
        error.message,
      );
    }
  }

  // Get a single application by ID
  async findOne(id: string): Promise<Application> {
    try {
      const application = await this.applicationModel.findById(id).exec();
      if (!application) {
        throw new NotFoundException(`Application with ID ${id} not found`);
      }
      return application;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to retrieve application with ID ${id}`,
        error.message,
      );
    }
  }

  // Get user application
  async findUserApplication(user: UserDocument): Promise<Application[]> {
    try {
      const application = await this.applicationModel
        .find({ user: user._id })
        .exec();
      if (!application) {
        throw new NotFoundException(
          `Application with user ${user._id} not found`,
        );
      }
      return application;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to retrieve application with user ${user._id}`,
        error.message,
      );
    }
  }

  // Update an application
  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    try {
      const updatedApplication = await this.applicationModel
        .findByIdAndUpdate(id, updateApplicationDto, { new: true })
        .exec();

      if (!updatedApplication) {
        throw new NotFoundException(`Application with ID ${id} not found`);
      }

      return updatedApplication;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to update application with ID ${id}`,
        error.message,
      );
    }
  }

  // Delete an application
  async remove(id: string): Promise<void> {
    try {
      const deletedApplication = await this.applicationModel
        .findByIdAndDelete(id)
        .exec();

      if (!deletedApplication) {
        throw new NotFoundException(`Application with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to delete application with ID ${id}`,
        error.message,
      );
    }
  }
}
