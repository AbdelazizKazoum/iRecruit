import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ApplicationsService } from './applications.service';
import { Application } from 'src/schemas/Applications.schema';
import { Candidature } from 'src/schemas/candidature.schema';
import { Tranche } from 'src/schemas/tranche.schema';
import { FileUploadService } from 'src/common/services/file-upload.service';

describe('ApplicationsService', () => {
  let service: ApplicationsService;
  let applicationModel: jest.Mock;
  let candidatureModel: { findOne: jest.Mock };
  let trancheModel: { findById: jest.Mock };
  let fileUploadService: { uploadFiles: jest.Mock };
  const saveMock = jest.fn();
  const mockFindById = (result: any) => ({
    exec: jest.fn().mockResolvedValue(result),
  }); // Helper to mirror mongoose .findById().exec() behavior.

  beforeEach(async () => {
    // Provide mocked models and services to isolate create logic.
    applicationModel = jest.fn().mockImplementation(() => ({
      save: saveMock,
    }));
    candidatureModel = { findOne: jest.fn() };
    trancheModel = { findById: jest.fn() };
    fileUploadService = { uploadFiles: jest.fn() };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        { provide: getModelToken(Application.name), useValue: applicationModel },
        { provide: getModelToken(Candidature.name), useValue: candidatureModel },
        { provide: getModelToken(Tranche.name), useValue: trancheModel },
        { provide: FileUploadService, useValue: fileUploadService },
      ],
    }).compile();

    service = moduleRef.get(ApplicationsService);
    saveMock.mockReset();
  });

  it('rejects missing tranche id', async () => {
    // Missing tranche id should be rejected early.
    await expect(
      service.create(
        { applicationDiploma: 'X' },
        [],
        { _id: new Types.ObjectId() },
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects closed tranche', async () => {
    // Closed tranche should block application creation.
    trancheModel.findById.mockReturnValue(
      mockFindById({
        _id: new Types.ObjectId(),
        isOpen: false,
        startDate: new Date(Date.now() - 1000),
        endDate: new Date(Date.now() + 1000),
        session: new Types.ObjectId(),
        jobOffer: new Types.ObjectId(),
      }),
    );

    await expect(
      service.create(
        { applicationDiploma: 'X', trancheId: new Types.ObjectId().toString() },
        [],
        { _id: new Types.ObjectId() },
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('creates application with tranche-derived fields', async () => {
    // Successful creation should derive offer/session/tranche from the tranche.
    const userId = new Types.ObjectId();
    const trancheId = new Types.ObjectId();
    const sessionId = new Types.ObjectId();
    const offerId = new Types.ObjectId();
    const filePaths = { declarationPdf: 'uploads/test.pdf' };

    trancheModel.findById.mockReturnValue(
      mockFindById({
        _id: trancheId,
        isOpen: true,
        startDate: new Date(Date.now() - 1000),
        endDate: new Date(Date.now() + 1000),
        session: sessionId,
        jobOffer: offerId,
      }),
    );
    candidatureModel.findOne.mockResolvedValue({
      personalInformation: { cin: 'AA123' },
    });
    fileUploadService.uploadFiles.mockResolvedValue(filePaths);
    saveMock.mockResolvedValue({
      user: userId,
      offer: offerId,
      session: sessionId,
      tranche: trancheId,
    });

    const result = await service.create(
      {
        applicationDiploma: 'Diploma',
        trancheId: trancheId.toString(),
        offer: { _id: offerId.toString() },
      },
      [{}],
      { _id: userId },
    );

    expect(applicationModel).toHaveBeenCalledWith(
      expect.objectContaining({
        user: userId,
        offer: expect.any(Types.ObjectId),
        session: expect.any(Types.ObjectId),
        tranche: expect.any(Types.ObjectId),
        applicationDiploma: 'Diploma',
        attachment: filePaths,
      }),
    );
    expect(result.tranche.toString()).toBe(trancheId.toString());
  });
});
