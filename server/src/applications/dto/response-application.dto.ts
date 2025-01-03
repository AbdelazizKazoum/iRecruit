import { IsString, IsMongoId, IsObject, IsOptional } from 'class-validator';

export class ResponseApplicationDto {
  @IsMongoId()
  user: string;

  @IsString()
  applicationDiploma: string;

  @IsMongoId()
  offer: string;

  @IsOptional()
  @IsObject()
  attachment?: {
    declarationPdf: string;
    motivationLetterPdf: string;
  };
}
