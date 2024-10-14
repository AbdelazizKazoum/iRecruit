/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModal: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModal({
      createUserDto,
    });
    return await newUser.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    return await this.userModal.findOne({ email }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
