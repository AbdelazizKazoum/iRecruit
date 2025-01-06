/* eslint-disable prettier/prettier */
import { UserUtilsService } from 'src/common/services/user-utils.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailerService: MailerService,
    private jwtService: JwtService,
    private userUtilsService: UserUtilsService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      cin: user.cin,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload),
      username: user.username,
      email: user.email,
      cin: user.cin,
      role: user.role,
    };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const user = await this.usersService.findOneByEmail(verifyEmailDto.email);
    if (user) throw new ConflictException("L'utilisateur existe déjà");

    const verifecationCode = this.jwtService.sign({
      email: verifyEmailDto.email,
      username: verifyEmailDto.username,
    });

    const verificationLink = `${process.env.FRONTEND}/fr/verify-email?code=${verifecationCode}`;

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
  }

  async checkEmail(code: string) {
    try {
      const payload = this.jwtService.verify(code);

      return {
        username: payload.username,
        email: payload.email,
        code,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid code !');
    }
  }

  async resetPasswordLink(email: string) {
    const findUser = await this.userUtilsService.checkUserExists(email);
    if (!findUser) throw new NotFoundException('Email Not found ! ');

    try {
      const verificationCode = this.jwtService.sign({
        email,
        username: findUser.username,
        id: findUser._id,
      });

      const verificationLink = `${process.env.FRONTEND}/fr/account/update-password?code=${verificationCode}`;

      return {
        link: verificationLink,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async checkResetLink(code: string) {
    try {
      const payload = this.jwtService.verify(code);

      return {
        username: payload.username,
        email: payload.email,
        id: payload.id,
        code,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid code !');
    }
  }

  // async register(code: string) {
  //   try {
  //     const payload = this.jwtService.verify(code);

  //     return {
  //       username: payload.username,
  //       email: payload.email,
  //       code,
  //     };
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid code !');
  //   }
  // }
}
