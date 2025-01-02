/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class MultilingualField {
  @IsString()
  fr: string;

  @IsString()
  en: string;

  @IsString()
  ar: string;
}
