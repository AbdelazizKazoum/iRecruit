/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { MailerService } from 'src/mailer/mailer.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findOneByEmail(registerDto.email);
    if (user) throw new ConflictException("L'utilisateur existe déjà");

    const verifecationCode = this.jwtService.sign({
      email: registerDto.email,
      username: registerDto.username,
    });

    const verificationLink = `${process.env.FRONTEND}/verify-email?code=${verifecationCode}`;

    // Send the verification email
    // await this.mailerService.sendMail({
    //   to: user.email,
    //   subject: 'Email Verification',
    //   text: `Click here to verify your email: ${verificationLink}`,
    // });

    console.log(verificationLink);

    return {
      link: verificationLink,
    };

    return { message: 'Verification email sent' };
  }
}
