import {
  IsNumber,
  IsObject,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { MultilingualField } from 'src/common/types/dtos';

export class CreateJobOfferDto {
  @IsObject()
  title: MultilingualField;

  @IsObject()
  description: MultilingualField;

  @IsObject()
  tag: MultilingualField;

  @IsDateString()
  datePublication: string;

  @IsDateString()
  depotAvant: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsObject() /* eslint-disable prettier/prettier */ city: MultilingualField;

  @IsObject()
  department: MultilingualField;

  @IsNumber()
  candidatesNumber: number;

  @IsOptional()
  @IsObject()
  grade?: MultilingualField;

  @IsOptional()
  @IsObject()
  organisme?: MultilingualField;

  @IsOptional()
  @IsObject()
  specialite?: MultilingualField;

  @IsOptional()
  @IsObject()
  etablissement?: MultilingualField;
}
