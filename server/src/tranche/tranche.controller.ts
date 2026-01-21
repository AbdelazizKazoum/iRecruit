/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TrancheService } from './tranche.service';
import { CreateTrancheDto } from './dto/create-tranche.dto';
import { UpdateTrancheDto } from './dto/update-tranche.dto';

@Controller('tranche')
export class TrancheController {
  constructor(private readonly trancheService: TrancheService) {}

  @Post()
  create(@Body() createTrancheDto: CreateTrancheDto) {
    return this.trancheService.create(createTrancheDto);
  }

  @Get('active')
  findActive() {
    return this.trancheService.findActive();
  }

  @Get('job-offer/:jobOfferId/sessions')
  getJobOfferSessions(
    @Param('jobOfferId') jobOfferId: string,
    @Query() query: any,
  ) {
    return this.trancheService.getJobOfferSessions(jobOfferId, query);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.trancheService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trancheService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrancheDto: UpdateTrancheDto) {
    return this.trancheService.update(id, updateTrancheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trancheService.remove(id);
  }
}
