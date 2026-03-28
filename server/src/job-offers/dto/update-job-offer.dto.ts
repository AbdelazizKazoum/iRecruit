/* eslint-disable prettier/prettier */

import {
  IsNumber,
  IsObject,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { MultilingualField } from 'src/common/types/dtos';

export class UpdateJobOfferDto {
  @IsOptional()
  @IsObject()
  title?: MultilingualField;

  @IsOptional()
  @IsObject()
  description?: MultilingualField;

  @IsOptional()
  @IsObject()
  tag?: MultilingualField;

  @IsOptional()
  @IsDateString()
  datePublication?: string;

  @IsOptional()
  @IsDateString()
  depotAvant?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsObject()
  city?: MultilingualField;

  @IsOptional()
  @IsObject()
  department?: MultilingualField;

  @IsOptional()
  @IsNumber()
  candidatesNumber?: number;

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
