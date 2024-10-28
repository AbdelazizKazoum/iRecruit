/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto);
  }

  @Post('update-password')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    try {
      const payload = this.jwtService.verify(updatePasswordDto.code);
      console.log('🚀 ~ UsersController ~ updatePassword ~ payload:', payload);
      return this.usersService.updatePassword({
        ...payload,
        newPassword: updatePasswordDto.newPassword,
      });
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
