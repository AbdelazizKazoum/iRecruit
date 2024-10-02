import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidatureDto } from './create-candidature.dto';

export class UpdateCandidatureDto extends PartialType(CreateCandidatureDto) {}
