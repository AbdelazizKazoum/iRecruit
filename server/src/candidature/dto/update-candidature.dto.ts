/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { PersonalInformationDto } from './create-candidature.dto';

export class UpdateCandidatureDto extends PartialType(PersonalInformationDto) {}
