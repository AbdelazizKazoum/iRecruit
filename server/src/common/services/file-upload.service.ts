/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

type UploadedFile = {
  originalname: string;
  buffer: Buffer;
};

@Injectable()
export class FileUploadService {
  /**
   * Upload files to a specified directory.
   * @param files - Array of files to upload
   * @param uploadPath - Directory where files will be stored
   * @param allowedFormats - Array of allowed file formats (e.g., ['pdf', 'png'])
   * @returns Array of file paths for the uploaded files
   */
  async uploadFiles(
    files: UploadedFile[],
    uploadPath: string,
    allowedFormats: string[],
  ): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided for upload');
    }

    // Ensure the upload path exists, create it if not
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const uploadedFilePaths: string[] = [];

    for (const file of files) {
      const fileExtension = file.originalname.split('.').pop().toLowerCase();

      // Validate file format
      if (!allowedFormats.includes(fileExtension)) {
        throw new BadRequestException(
          `Invalid file format. Allowed formats: ${allowedFormats.join(', ')}`,
        );
      }

      // Define the full file path
      const filePath = path.join(uploadPath, file.originalname);

      // Save the file
      fs.writeFileSync(filePath, file.buffer);
      uploadedFilePaths.push(filePath);
    }

    return uploadedFilePaths;
  }
}
