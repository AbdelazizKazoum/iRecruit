import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Request,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('application')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('attachment')) // 'files' must match the form-data field name
  create(
    @UploadedFiles() files: any,
    @Body('data') application: string,
    @Request() req, // Access the request object
  ) {
    const user = req.user; // Extract the user from the request
    const data = JSON.parse(application);

    return this.applicationsService.create(data, files, user);
  }

  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }
}
