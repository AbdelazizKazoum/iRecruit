import { FileUploadService } from 'src/common/services/file-upload.service';
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
  Response,
} from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';

@Controller('candidature')
export class CandidatureController {
  constructor(
    private readonly candidatureService: CandidatureService,
    private readonly fileUploadService: FileUploadService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  /**
   * Endpoint to download a file
   * @param filePath - Path to the file on the server
   * @param res - Express response object
   */
  @Post('files')
  async sendFileToFrontend(
    @Body() body: { filePath: string },
    @Response() res,
  ) {
    const { filePath } = body;
    try {
      return res.sendFile(filePath, { root: '.' });
    } catch (error) {
      return res.status(500).json({
        message: 'File not found or error occurred',
        error: error.message,
      });
    }
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
