/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';

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
   * @returns Object with original file names (without extensions) as keys and their paths as values
   */
  async uploadFiles(
    files: UploadedFile[],
    uploadPath: string,
    allowedFormats: string[],
  ): Promise<Record<string, string>> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided for upload');
    }

    // Ensure the upload path exists, create it if not
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const uploadedFiles: Record<string, string> = {};

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

      // Extract file name without extension
      const fileNameWithoutExtension = path.basename(
        file.originalname,
        `.${fileExtension}`,
      );

      // Add to the result object
      uploadedFiles[fileNameWithoutExtension.split('-')[0]] = filePath;
    }

    return uploadedFiles;
  }

  /**
   * Retrieve a file from the server and prepare it for sending to the frontend.
   * @param filePath - Path of the file on the server
   * @returns A readable stream of the file
   */
  getFile(filePath: string): Readable {
    const absolutePath = path.resolve(filePath);

    // Validate file existence
    if (!fs.existsSync(absolutePath)) {
      throw new BadRequestException('File not found');
    }

    // Return readable file stream
    return fs.createReadStream(absolutePath);
  }
}
