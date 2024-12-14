/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { CreateCandidatureDto } from './dto/create-candidature.dto';
import { UpdateCandidatureDto } from './dto/update-candidature.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('candidature')
export class CandidatureController {
  constructor(private readonly candidatureService: CandidatureService) {}

  @Post('personal-informations')
  @UseInterceptors(FilesInterceptor('files')) // 'files' must match the form-data field name
  savePersonalInformations(
    @Body('personalInformations') personalInformations: CreateCandidatureDto,
    @UploadedFiles() files: any,
  ) {
    return this.candidatureService.savePersonalInformations(
      personalInformations,
      files,
    );
  }

  @Get()
  findAll() {
    return this.candidatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatureService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCandidatureDto: UpdateCandidatureDto,
  ) {
    return this.candidatureService.update(+id, updateCandidatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatureService.remove(+id);
  }
}
