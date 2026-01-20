/* eslint-disable prettier/prettier */
import { IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateRecruitmentSessionDto {
  @IsOptional()
  @IsString()
  yearLabel?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
