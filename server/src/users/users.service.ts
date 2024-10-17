/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModal: Model<User>,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModal({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

      const payload = this.verifyVerificationCode(registerUserDto.code);

      const newUser = new this.userModal({
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
        role: 'Candidat',
      });

      return newUser.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
      return await this.userModal.findById(id).select('-password').exec();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.userModal.deleteOne({ _id: id });
  }

  //------------------------- Methods     -----------------

  private verifyVerificationCode(code: string): any {
    try {
      console.log('🚀 ~ UsersService ~ verifyVerificationCode ~ code:', code);
      return this.jwtService.verify(code);
    } catch (error) {
      throw new UnauthorizedException('Verification code is invalid!');
    }
  }
}
