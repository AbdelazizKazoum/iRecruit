/* eslint-disable prettier/prettier */
// src/common/services/user-utils.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserUtilsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // Method to format user's name
  getFormattedName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
  }

  // Method to calculate age based on birth date
  calculateAge(birthDate: Date): number {
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  // Method to check if a user exists in the database by email
  async checkUserExists(email: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
