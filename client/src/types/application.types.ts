import { UserType } from "./user.types";

export interface ApplicationType {
  user?: UserType;
  applicationDiploma: string;

  attachment: {
    declarationPdf: string | File;
    motivationLetterPdf: string | File;
  };
}
