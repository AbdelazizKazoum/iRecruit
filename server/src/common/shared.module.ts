/* eslint-disable prettier/prettier */
// src/common/shared.module.ts
import { Module } from '@nestjs/common';
import { UserUtilsService } from './services/user-utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserUtilsService],
  exports: [UserUtilsService, MongooseModule, JwtModule],
})
export class SharedModule {}
