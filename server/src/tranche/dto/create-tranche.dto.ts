/* eslint-disable prettier/prettier */
import {
  IsString,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsMongoId,
  IsNumber,
} from 'class-validator';

export class CreateTrancheDto {
  @IsString()
  name: string;

  @IsMongoId()
  session: string;

  @IsMongoId()
  jobOffer: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;

  @IsOptional()
  @IsNumber()
  maxCandidates?: number;
}
