/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.findOne(loginDto.email);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
