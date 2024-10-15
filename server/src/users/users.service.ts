/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModal: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModal({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  findAll() {
    return this.userModal.find().exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userModal.findOne({ email }).exec();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  async findOneById(id: string) {
    try {
      return await this.userModal.findById(id).exec();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
