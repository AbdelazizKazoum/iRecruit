import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model, Types } from 'mongoose';
import * as request from 'supertest';
import { ApplicationsModule } from '../src/applications/applications.module';
import { Application } from '../src/schemas/Applications.schema';
import { Candidature } from '../src/schemas/candidature.schema';
import { JobOffer, JobOfferSchema } from '../src/schemas/JobOffer.schema';
import {
  RecruitmentSession,
  RecruitmentSessionSchema,
} from '../src/schemas/recruitment-session.schema';
import { Tranche } from '../src/schemas/tranche.schema';
import { User } from '../src/schemas/user.schema';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth-guard';
import { FileUploadService } from '../src/common/services/file-upload.service';

jest.setTimeout(30000); // Allow extra time for in-memory MongoDB startup.

describe('Applications (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let userModel: Model<User>;
  let candidatureModel: Model<Candidature>;
  let jobOfferModel: Model<JobOffer>;
  let sessionModel: Model<RecruitmentSession>;
  let trancheModel: Model<Tranche>;
  let applicationModel: Model<Application>;
  const mockUser = { _id: new Types.ObjectId() };

  beforeAll(async () => {
    // Start an in-memory MongoDB instance for integration testing.
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        // Wire the in-memory database connection for the test app.
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([
          { name: JobOffer.name, schema: JobOfferSchema },
          {
            name: RecruitmentSession.name,
            schema: RecruitmentSessionSchema,
          },
        ]),
        ApplicationsModule,
      ],
    })
      // Bypass JWT guard and inject a mock user for the request.
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.user = mockUser;
          return true;
        },
      })
      // Stub file uploads to avoid writing to disk during tests.
      .overrideProvider(FileUploadService)
      .useValue({
        uploadFiles: async () => ({ declarationPdf: 'uploads/test.pdf' }),
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    // Resolve models for test data setup.
    userModel = moduleRef.get(getModelToken(User.name));
    candidatureModel = moduleRef.get(getModelToken(Candidature.name));
    jobOfferModel = moduleRef.get(getModelToken(JobOffer.name));
    sessionModel = moduleRef.get(getModelToken(RecruitmentSession.name));
    trancheModel = moduleRef.get(getModelToken(Tranche.name));
    applicationModel = moduleRef.get(getModelToken(Application.name));
  });

  afterAll(async () => {
    // Close the Nest app and stop the in-memory database.
    if (app) {
      await app.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('creates application with session and tranche', async () => {
    // Prepare a user and candidature required by the application flow.
    await userModel.create({
      _id: mockUser._id,
      username: 'candidate',
      email: 'candidate@example.com',
      password: 'password',
      role: 'candidate',
      bio: '',
    });
    await candidatureModel.create({
      user: mockUser._id,
      personalInformation: {
        prenom: 'Test',
        prenomAr: 'Test',
        nom: 'User',
        nomAr: 'User',
        adresse: 'Address',
        adresseAr: 'Address',
        lieuNaissance: 'City',
        cin: 'AA123',
        dateNaissance: new Date(),
        sexe: 'masculin',
        situation: 'celibataire',
        telephone: '0600000000',
        email: 'candidate@example.com',
        files: {},
      },
    });

    // Create job offer, session, and active tranche for the application.
    const ownerId = new Types.ObjectId();
    const offer = await jobOfferModel.create({
      title: { fr: 'Titre', en: 'Title', ar: 'Title' },
      description: { fr: 'Desc', en: 'Desc', ar: 'Desc' },
      tag: { fr: 'Tag', en: 'Tag', ar: 'Tag' },
      datePublication: '2025-01-01',
      depotAvant: '2025-12-31',
      imageUrl: 'https://example.com/image.png',
      city: { fr: 'Rabat', en: 'Rabat', ar: 'Rabat' },
      department: { fr: 'Dept', en: 'Dept', ar: 'Dept' },
      candidatesNumber: 1,
      owner: ownerId,
    });
    const session = await sessionModel.create({
      yearLabel: '2025/2026',
      startDate: new Date(Date.now() - 1000),
      endDate: new Date(Date.now() + 1000 * 60 * 60),
      isActive: true,
    });
    const tranche = await trancheModel.create({
      name: 'Winter',
      session: session._id,
      jobOffer: offer._id,
      startDate: new Date(Date.now() - 1000),
      endDate: new Date(Date.now() + 1000 * 60 * 60),
      isOpen: true,
    });

    // Submit an application payload with tranche id.
    await request(app.getHttpServer())
      .post('/application')
      .field(
        'data',
        JSON.stringify({
          applicationDiploma: 'Diploma',
          trancheId: tranche._id.toString(),
        }),
      )
      .attach('attachment', Buffer.from('%PDF-1.4\n'), 'declarationPdf-.pdf')
      .expect(201);

    // Verify session and tranche are persisted on the application.
    const saved = await applicationModel
      .findOne({ user: mockUser._id })
      .exec();
    expect(saved).toBeTruthy();
    expect(saved.tranche.toString()).toBe(tranche._id.toString());
    expect(saved.session.toString()).toBe(session._id.toString());
    expect(saved.offer.toString()).toBe(offer._id.toString());
  });

  it('rejects expired tranche', async () => {
    // Create an expired tranche to validate date enforcement.
    const expiredSession = await sessionModel.create({
      yearLabel: '2023/2024',
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
      endDate: new Date(Date.now() - 1000 * 60 * 60),
      isActive: true,
    });
    const expiredOffer = await jobOfferModel.create({
      title: { fr: 'Titre', en: 'Title', ar: 'Title' },
      description: { fr: 'Desc', en: 'Desc', ar: 'Desc' },
      tag: { fr: 'Tag', en: 'Tag', ar: 'Tag' },
      datePublication: '2023-01-01',
      depotAvant: '2023-12-31',
      imageUrl: 'https://example.com/image.png',
      city: { fr: 'Rabat', en: 'Rabat', ar: 'Rabat' },
      department: { fr: 'Dept', en: 'Dept', ar: 'Dept' },
      candidatesNumber: 1,
      owner: new Types.ObjectId(),
    });
    const expiredTranche = await trancheModel.create({
      name: 'Expired',
      session: expiredSession._id,
      jobOffer: expiredOffer._id,
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
      endDate: new Date(Date.now() - 1000 * 60 * 60),
      isOpen: true,
    });

    // Attempt to apply to an expired tranche should return 400.
    await request(app.getHttpServer())
      .post('/application')
      .field(
        'data',
        JSON.stringify({
          applicationDiploma: 'Diploma',
          trancheId: expiredTranche._id.toString(),
        }),
      )
      .attach('attachment', Buffer.from('%PDF-1.4\n'), 'declarationPdf-.pdf')
      .expect(400);
  });
});
