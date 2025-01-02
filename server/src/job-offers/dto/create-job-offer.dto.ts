import { IsNumber, IsObject, IsUrl, IsDateString } from 'class-validator';
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

  @IsUrl()
  imageUrl: string;

  @IsObject() /* eslint-disable prettier/prettier */ city: MultilingualField;

  @IsObject()
  department: MultilingualField;

  @IsNumber()
  candidatesNumber: number;
}
