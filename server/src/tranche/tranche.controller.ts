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

  @Get()
  findAll(@Query('session') sessionId?: string) {
    if (sessionId) {
      return this.trancheService.findBySession(sessionId);
    }
    return this.trancheService.findAll();
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
