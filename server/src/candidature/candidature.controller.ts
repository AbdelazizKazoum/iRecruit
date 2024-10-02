import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { CreateCandidatureDto } from './dto/create-candidature.dto';
import { UpdateCandidatureDto } from './dto/update-candidature.dto';

@Controller('candidature')
export class CandidatureController {
  constructor(private readonly candidatureService: CandidatureService) {}

  @Post()
  create(@Body() createCandidatureDto: CreateCandidatureDto) {
    return this.candidatureService.create(createCandidatureDto);
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
  update(@Param('id') id: string, @Body() updateCandidatureDto: UpdateCandidatureDto) {
    return this.candidatureService.update(+id, updateCandidatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatureService.remove(+id);
  }
}
