import { IsString, IsObject, IsOptional, IsMongoId } from 'class-validator';

export class UpdateApplicationDto {
  @IsMongoId()
  @IsOptional()
  user?: string;

  @IsString()
  @IsOptional()
  applicationDiploma?: string;

  @IsMongoId()
  @IsOptional()
  offer?: string;

  @IsOptional()
  @IsObject()
  attachment?: {
    declarationPdf?: string | File;
    motivationLetterPdf?: string | File;
  };
}
