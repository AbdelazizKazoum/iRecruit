import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { FindJobOffersQueryDto } from './dto/find-job-offers-query.dto';
import { OptionalAuthGuard } from 'src/common/guards/optional-auth-guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image'))
  create(
    @Request() req,
    @UploadedFiles() files: any,
    @Body() body: any,
  ) {
    let payload: CreateJobOfferDto = body;
    if (typeof body?.data === 'string') {
      try {
        payload = JSON.parse(body.data) as CreateJobOfferDto;
      } catch (error) {
        throw new BadRequestException('Invalid job offer payload');
      }
    }
    return this.jobOffersService.create(payload, req.user, files);
  }

  @Get()
  @UseGuards(OptionalAuthGuard)
  findAll(
    @Request() req, // Access the request object
  ) {
    const user = req.user;
    return this.jobOffersService.findAll(user);
  }

  @Get('admin')
  findAllWithFilters(@Query() query: FindJobOffersQueryDto) {
    return this.jobOffersService.findAllWithFilters(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobOffersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image'))
  update(
    @Param('id') id: string,
    @UploadedFiles() files: any,
    @Body() body: any,
  ) {
    let payload: UpdateJobOfferDto = body;
    if (typeof body?.data === 'string') {
      try {
        payload = JSON.parse(body.data) as UpdateJobOfferDto;
      } catch (error) {
        throw new BadRequestException('Invalid job offer payload');
      }
    }
    return this.jobOffersService.update(id, payload, files);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.jobOffersService.remove(id);
  }
}
