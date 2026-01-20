/* eslint-disable prettier/prettier */
import {
  IsString,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsMongoId,
  IsNumber,
} from 'class-validator';

export class UpdateTrancheDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsMongoId()
  session?: string;

  @IsOptional()
  @IsMongoId()
  jobOffer?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;

  @IsOptional()
  @IsNumber()
  maxCandidates?: number;
}
