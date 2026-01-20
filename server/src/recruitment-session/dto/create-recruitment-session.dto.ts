/* eslint-disable prettier/prettier */
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateRecruitmentSessionDto {
  @IsString()
  yearLabel: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  description?: string;
}
