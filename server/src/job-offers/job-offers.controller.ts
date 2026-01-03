/* eslint-disable prettier/prettier */
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
} from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { OptionalAuthGuard } from 'src/common/guards/optional-auth-guard';

@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Post()
  create(@Body() createJobOfferDto: CreateJobOfferDto) {
    return this.jobOffersService.create(createJobOfferDto);
  }

  @Get()
  @UseGuards(OptionalAuthGuard)
  findAll(
    @Request() req, // Access the request object
    @Query('search') search?: string,
    @Query('region') region?: string,
    @Query('published') published?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const user = req.user;
    return this.jobOffersService.findAll(user, {
      search,
      region,
      published,
      page,
      limit,
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.jobOffersService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobOfferDto: UpdateJobOfferDto,
  ) {
    return this.jobOffersService.update(id, updateJobOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobOffersService.remove(id);
  }
}
