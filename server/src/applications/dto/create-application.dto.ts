import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateApplicationDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string; // MongoDB ObjectId as a string

  @IsString()
  @IsNotEmpty()
  applicationDiploma: string;

  @IsMongoId()
  @IsNotEmpty()
  offer: string; // MongoDB ObjectId as a string

  @IsOptional()
  @IsObject()
  attachment?: {
    declarationPdf: string | File; // Specify how you'll handle file types
    motivationLetterPdf: string | File; // Specify how you'll handle file types
  };
}
