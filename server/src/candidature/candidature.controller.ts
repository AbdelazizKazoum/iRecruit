/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';

@Controller('candidature')
export class CandidatureController {
  constructor(private readonly candidatureService: CandidatureService) {}

  @UseGuards(JwtAuthGuard)
  @Post('personal-informations')
  @UseInterceptors(FilesInterceptor('files')) // 'files' must match the form-data field name
  async savePersonalInformations(
    @UploadedFiles() files: any,
    @Body('personalInformations') personalInformations: string,
    @Request() req, // Access the request object
  ) {
    const user = req.user; // Extract the user from the request
    const data = JSON.parse(personalInformations);

    return await this.candidatureService.savePersonalInformations(
      data,
      files,
      user,
    );
  }

  // Save diplomes
  @UseGuards(JwtAuthGuard)
  @Post('diplomes')
  @UseInterceptors(FilesInterceptor('files')) // 'files' must match the form-data field name
  async saveDoplomes(
    @UploadedFiles() files: any,
    @Body('diplomes') diplomes,
    @Request() req, // Access the request object
  ) {
    console.log('🚀 ~ CandidatureController ~ files:', files);
    const user = req.user; // Extract the user from the request
    const data = JSON.parse(diplomes);

    return await this.candidatureService.saveDiplomes(data, files, user);
  }

  @Get()
  findAll() {
    return this.candidatureService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  getCandidature(@Request() req) {
    const user = req.user;
    return this.candidatureService.findMyCandidature(user);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCandidatureDto: UpdateCandidatureDto,
  // ) {
  //   return this.candidatureService.update(+id, updateCandidatureDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatureService.remove(+id);
  }
}
