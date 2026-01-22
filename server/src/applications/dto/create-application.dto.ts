import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateApplicationDto {
  @IsMongoId()
  @IsOptional()
  user?: string; // User is inferred from JWT, not from the payload.

  @IsString()
  @IsNotEmpty()
  applicationDiploma: string;

  @IsMongoId()
  @IsOptional()
  offer?: string; // Offer is derived from the tranche on the backend.

  @IsMongoId()
  @IsNotEmpty()
  trancheId: string; // Tranche id required to derive session/job offer.

  @IsOptional()
  @IsObject()
  attachment?: {
    declarationPdf: string | File; // Specify how you'll handle file types
    motivationLetterPdf: string | File; // Specify how you'll handle file types
  };
}
