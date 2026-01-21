/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tranche, TrancheDocument } from 'src/schemas/tranche.schema';
import {
  RecruitmentSession,
  RecruitmentSessionDocument,
} from 'src/schemas/recruitment-session.schema';
import { CreateTrancheDto } from './dto/create-tranche.dto';
import { UpdateTrancheDto } from './dto/update-tranche.dto';

@Injectable()
export class TrancheService {
  constructor(
    @InjectModel(Tranche.name) private trancheModel: Model<TrancheDocument>,
    @InjectModel(RecruitmentSession.name)
    private recruitmentSessionModel: Model<RecruitmentSessionDocument>,
  ) {}

  async getJobOfferSessions(jobOfferId: string, query: any) {
    if (!jobOfferId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid Job Offer ID format');
    }

    const { page = 1, limit = 10, session, date } = query;
    const skip = (Number(page) - 1) * Number(limit);

    const matchStage: any = {};

    if (session) {
      matchStage.yearLabel = { $regex: session, $options: 'i' };
    }

    if (date) {
      const queryDate = new Date(date);
      if (!isNaN(queryDate.getTime())) {
        matchStage.startDate = { $lte: queryDate };
        matchStage.endDate = { $gte: queryDate };
      }
    }

    const pipeline: any[] = [
      { $match: matchStage },
      { $sort: { startDate: -1 } },
      { $skip: skip },
      { $limit: Number(limit) },
      {
        $lookup: {
          from: 'tranches',
          let: { sessionId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$session', '$$sessionId'] },
                    {
                      $eq: ['$jobOffer', new Types.ObjectId(jobOfferId)],
                    },
                  ],
                },
              },
            },
            { $sort: { startDate: 1 } },
          ],
          as: 'tranches',
        },
      },
    ];

    const [data, total] = await Promise.all([
      this.recruitmentSessionModel.aggregate(pipeline).exec(),
      this.recruitmentSessionModel.countDocuments(matchStage).exec(),
    ]);

    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    };
  }

  async create(createTrancheDto: CreateTrancheDto): Promise<Tranche> {
    const startDate = new Date(createTrancheDto.startDate);
    const endDate = new Date(createTrancheDto.endDate);

    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    const createdTranche = new this.trancheModel({
      ...createTrancheDto,
      startDate,
      endDate,
    });
    return createdTranche.save();
  }

  async findAll(query: any = {}): Promise<any> {
    const { page = 1, limit = 10, session, jobOffer, name, isOpen } = query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter: any = {};

    if (session) {
      if (session.match(/^[0-9a-fA-F]{24}$/)) {
        filter.session = session;
      }
    }

    if (jobOffer) {
      filter.jobOffer = jobOffer;
    }

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (isOpen !== undefined) {
      filter.isOpen = isOpen === 'true';
    }

    const [data, total] = await Promise.all([
      this.trancheModel
        .find(filter)
        .populate('session')
        .populate('jobOffer')
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 })
        .exec(),
      this.trancheModel.countDocuments(filter).exec(),
    ]);

    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    };
  }

  async findOne(id: string): Promise<Tranche> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }

    const tranche = await this.trancheModel
      .findById(id)
      .populate('session')
      .populate('jobOffer')
      .exec();

    if (!tranche) {
      throw new NotFoundException(`Tranche with ID ${id} not found`);
    }

    return tranche;
  }

  async update(
    id: string,
    updateTrancheDto: UpdateTrancheDto,
  ): Promise<Tranche> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }

    const updateData: any = { ...updateTrancheDto };

    if (updateTrancheDto.startDate) {
      updateData.startDate = new Date(updateTrancheDto.startDate);
    }
    if (updateTrancheDto.endDate) {
      updateData.endDate = new Date(updateTrancheDto.endDate);
    }

    // Check dates consistency if one or both are provided
    if (updateData.startDate || updateData.endDate) {
      const existingTranche = await this.trancheModel.findById(id).exec();
      if (!existingTranche) {
        throw new NotFoundException(`Tranche with ID ${id} not found`);
      }

      const start = updateData.startDate || existingTranche.startDate;
      const end = updateData.endDate || existingTranche.endDate;

      if (new Date(start) >= new Date(end)) {
        throw new BadRequestException('Start date must be before end date');
      }
    }

    const updatedTranche = await this.trancheModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('session')
      .populate('jobOffer')
      .exec();

    if (!updatedTranche) {
      throw new NotFoundException(`Tranche with ID ${id} not found`);
    }

    return updatedTranche;
  }

  async remove(id: string): Promise<void> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }

    const result = await this.trancheModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Tranche with ID ${id} not found`);
    }
  }

  async findBySession(sessionId: string): Promise<Tranche[]> {
    if (!sessionId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid Session ID format');
    }
    return this.trancheModel
      .find({ session: sessionId })
      .populate('session')
      .populate('jobOffer')
      .exec();
  }
}
