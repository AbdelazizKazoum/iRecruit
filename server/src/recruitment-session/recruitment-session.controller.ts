/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RecruitmentSessionService } from './recruitment-session.service';
import { CreateRecruitmentSessionDto } from './dto/create-recruitment-session.dto';
import { UpdateRecruitmentSessionDto } from './dto/update-recruitment-session.dto';

@Controller('recruitment-session')
export class RecruitmentSessionController {
  constructor(private readonly recruitmentSessionService: RecruitmentSessionService) {}

  @Post()
  create(@Body() createDto: CreateRecruitmentSessionDto) {
    return this.recruitmentSessionService.create(createDto);
  }

  @Get()
  findAll() {
    return this.recruitmentSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentSessionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRecruitmentSessionDto) {
    return this.recruitmentSessionService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentSessionService.remove(id);
  }
}