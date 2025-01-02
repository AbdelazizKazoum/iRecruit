/* eslint-disable prettier/prettier */
import { FileUploadService } from 'src/common/services/file-upload.service';
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
    const user = req.user; // Extract the user from the request
    const data = JSON.parse(diplomes);

    return await this.candidatureService.saveDiplomes(data, files, user);
  }

  // Save diplomes
  @UseGuards(JwtAuthGuard)
  @Post('niveaux-langues')
  @UseInterceptors(FilesInterceptor('files')) // 'files' must match the form-data field name
  async saveNiveauxLangues(
    @UploadedFiles() files: any,
    @Body('niveauxLangues') diplomes,
    @Request() req, // Access the request object
  ) {
    const user = req.user; // Extract the user from the request
    const data = JSON.parse(diplomes);

    return await this.candidatureService.saveLanguages(data, files, user);
  }

  // Save publications
  @UseGuards(JwtAuthGuard)
  @Post('publications')
  @UseInterceptors(FilesInterceptor('files')) // 'files' must match the form-data field name
  async savePublications(
    @UploadedFiles() files: any,
    @Body('publications') publications,
    @Request() req, // Access the request object
  ) {
    const user = req.user; // Extract the user from the request
    const data = JSON.parse(publications);

    return await this.candidatureService.savePublications(data, files, user);
  }

  // Save communications
  @UseGuards(JwtAuthGuard)
  @Post('communications')
  @UseInterceptors(FilesInterceptor('files')) // 'files' must match the form-data field name
  async saveCommunication(
    @UploadedFiles() files: any,
    @Body('communication') communication,
    @Request() req, // Access the request object
  ) {
    const user = req.user; // Extract the user from the request
    const data = JSON.parse(communication);

    return await this.candidatureService.saveCommunications(data, files, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  validateCandidature(@Request() req) {
    const user = req.user;
    return this.candidatureService.validateCandidature(user);
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
