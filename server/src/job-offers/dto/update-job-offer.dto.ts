/* eslint-disable prettier/prettier */

import { IsNumber, IsObject, IsUrl, IsDateString } from 'class-validator';
import { MultilingualField } from 'src/common/types/dtos';

export class UpdateJobOfferDto {
  @IsObject()
  title?: MultilingualField;

  @IsObject()
  description?: MultilingualField;

  @IsObject()
  tag?: MultilingualField;

  @IsDateString()
  datePublication?: string;

  @IsDateString()
  depotAvant?: string;

  @IsUrl()
  imageUrl?: string;

  @IsObject()
  city?: MultilingualField;

  @IsObject()
  department?: MultilingualField;

  @IsNumber()
  candidatesNumber?: number;
}
