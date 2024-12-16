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
  Req,
} from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PersonalInformationDto } from './dto/create-candidature.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { Request } from 'express';

UseGuards(JwtAuthGuard);
@Controller('candidature')
export class CandidatureController {
  constructor(private readonly candidatureService: CandidatureService) {}

  @Post('personal-informations')
  @UseInterceptors(FilesInterceptor('files')) // 'files' must match the form-data field name
  async savePersonalInformations(
    @UploadedFiles() files: any,
    @Body('personalInformations') personalInformations: PersonalInformationDto,
    @Req() req: Request, // Access the request object
  ) {
    const user = req.user; // Extract the user from the request
    console.log('🚀 ~ CandidatureController ~ user:', user);

    return await this.candidatureService.savePersonalInformations(
      personalInformations,
      files,
      user,
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
