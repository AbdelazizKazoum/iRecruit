/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from 'src/schemas/Applications.schema';
import { Candidature } from 'src/schemas/candidature.schema';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { UserDocument } from 'src/schemas/user.schema';
import { Tranche, TrancheDocument } from 'src/schemas/tranche.schema'; // Tranche lookup for session/job offer tagging.

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<Application>,

    @InjectModel(Candidature.name)
    private candidatureModel: Model<Candidature>,

    @InjectModel(Tranche.name)
    private trancheModel: Model<TrancheDocument>, // Tranche model used to validate application context.

    private fileUploadService: FileUploadService,
  ) {}

  // Map localized application status values to the admin UI status tags.
  private mapApplicationStatus(statut?: {
    fr?: string;
    en?: string;
    ar?: string;
  }): 'pending' | 'accepted' | 'rejected' {
    const raw = `${statut?.en || ''} ${statut?.fr || ''} ${
      statut?.ar || ''
    }`.toLowerCase();
    if (raw.includes('accept')) {
      return 'accepted';
    }
    if (raw.includes('reject') || raw.includes('refus') || raw.includes('rejet')) {
      return 'rejected';
    }
    return 'pending';
  }

  // Build the candidate profile payload expected by the admin candidate list.
  private buildCandidateProfile(application: any, candidature: any) {
    const personalInfo = candidature?.personalInformation || {};
    const professionalInfo = candidature?.professionalInformation || {};
    const files = personalInfo.files || {};
    // Normalize optional arrays to keep the frontend payload consistent.
    const experiencePedagogique = Array.isArray(
      professionalInfo.experiencePedagogique,
    )
      ? professionalInfo.experiencePedagogique
      : professionalInfo.experiencePedagogique
        ? [professionalInfo.experiencePedagogique]
        : [];
    const residanat = Array.isArray(professionalInfo.residanat)
      ? professionalInfo.residanat
      : professionalInfo.residanat
        ? [professionalInfo.residanat]
        : [];

    return {
      _id: String(application?._id), // Use application id for stable list keys.
      status: this.mapApplicationStatus(application?.statut), // Normalize status for badges.
      appliedDate: new Date(
        application?.recuCandidature || application?.createdAt || new Date(),
      ).toISOString(), // Use application timestamps for the applied date.
      applicationDiploma: application?.applicationDiploma || '', // Share application-specific diploma for admins.
      applicationAttachments: {
        declarationPdf: application?.attachment?.declarationPdf || '',
        motivationLetterPdf: application?.attachment?.motivationLetterPdf || '',
      }, // Expose application attachments for download.
      personalInformation: {
        prenom: personalInfo.prenom || '',
        nom: personalInfo.nom || '',
        prenomAr: personalInfo.prenomAr || '',
        nomAr: personalInfo.nomAr || '',
        email: personalInfo.email || '',
        cin: personalInfo.cin || '',
        dateNaissance: personalInfo.dateNaissance || '',
        situation: personalInfo.situation || '',
        telephone: personalInfo.telephone || '',
        adresse: personalInfo.adresse || '',
        adresseAr: personalInfo.adresseAr || '',
        lieuNaissance: personalInfo.lieuNaissance || '',
        sexe: personalInfo.sexe || '',
        experiences: personalInfo.experiences || {},
        situationDeHandicap: personalInfo.situationDeHandicap || {},
        files: {
          cvPdf: files.cvPdf || '',
          cinPdf: files.cinPdf || '',
          bacPdf: files.bacPdf || '',
          attestation: files.attestation || '',
        },
      },
      professionalInformation: {
        parcoursEtDiplomes: professionalInfo.parcoursEtDiplomes || [],
        niveauxLangues: professionalInfo.niveauxLangues || [],
        experiences: professionalInfo.experiences || [],
        experiencePedagogique,
        publications: professionalInfo.publications || [],
        communications: professionalInfo.communications || [],
        residanat,
        autresDocuments: professionalInfo.autresDocuments || [],
      },
    };
  }

  // Create a new application
  async create(data, files: any, user: any): Promise<Application> {
    try {
      // Resolve tranche id from the payload for session/job offer derivation.
      const trancheId =
        data?.trancheId || data?.tranche?._id || data?.tranche;
      if (!trancheId) {
        throw new BadRequestException('Tranche id is required');
      }

      // Load tranche to validate the application window and context.
      const tranche = await this.trancheModel.findById(trancheId).exec();
      if (!tranche) {
        throw new NotFoundException('Tranche not found');
      }

      // Enforce tranche availability rules before accepting applications.
      const now = new Date();
      if (!tranche.isOpen) {
        throw new BadRequestException('Tranche is closed');
      }
      if (now < tranche.startDate || now > tranche.endDate) {
        throw new BadRequestException('Tranche is not active');
      }
      if (!tranche.session || !tranche.jobOffer) {
        throw new BadRequestException('Tranche is missing session or job offer');
      }

      // Ensure client-provided offer (if any) matches the tranche job offer.
      const providedOfferId = data?.offer?._id || data?.offer;
      if (
        providedOfferId &&
        String(providedOfferId) !== String(tranche.jobOffer)
      ) {
        throw new BadRequestException('Job offer does not match tranche');
      }

      // Normalize user id for consistent document references.
      const userId = user?._id || user?.id || user;

      // Check if a candidature already exists for the given user
      const existingCandidature = await this.candidatureModel.findOne({
        user: userId,
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
        user: userId, // Use normalized user id for the application.
        offer: new Types.ObjectId(String(tranche.jobOffer)), // Derive offer from the tranche for integrity.
        session: new Types.ObjectId(String(tranche.session)), // Derive session from the tranche.
        tranche: new Types.ObjectId(String(tranche._id)), // Persist the tranche context.
        applicationDiploma: data.applicationDiploma, // Persist the submitted diploma label.
        attachment: filePaths, // Persist uploaded attachments.
      });

      // Save the updated candidature

      return await createApplication.save(); // Make sure to await here
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Preserve explicit validation errors for the client.
      }
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

  // Get tranche applications with candidate profiles for admin views.
  async findByTranche(trancheId: string) {
    // Validate input to avoid invalid ObjectId queries.
    if (!Types.ObjectId.isValid(trancheId)) {
      throw new BadRequestException('Invalid tranche id');
    }

    // Load applications tied to the tranche.
    const applications = await this.applicationModel
      .find({ tranche: new Types.ObjectId(trancheId) })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Short-circuit if there are no applications to enrich.
    if (!applications.length) {
      return [];
    }

    // Collect user ids to fetch candidature profiles in bulk.
    const userIds = applications.map((application) => application.user).filter(Boolean);

    // Load candidate dossiers in one query for mapping.
    const candidatures = await this.candidatureModel
      .find({ user: { $in: userIds } })
      .lean()
      .exec();

    // Index candidatures by user id for fast lookup.
    const candidatureByUserId = new Map(
      candidatures.map((candidature) => [String(candidature.user), candidature]),
    );

    // Return the UI-ready candidate profiles aligned with applications.
    return applications.map((application) =>
      this.buildCandidateProfile(
        application,
        candidatureByUserId.get(String(application.user)),
      ),
    );
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
        .populate('offer')
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
