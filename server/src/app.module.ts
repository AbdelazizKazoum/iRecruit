/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidatureModule } from './candidature/candidature.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from './mailer/mailer.module';
import { JobOffersModule } from './job-offers/job-offers.module';
import { ApplicationsModule } from './applications/applications.module';
import { RecruitmentSessionModule } from './recruitment-session/recruitment-session.module';
import { TrancheModule } from './tranche/tranche.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `${
        process.env.MONGO_LOCAL_CONNECT
          ? process.env.MONGO_LOCAL_CONNECT
          : `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`
      }`,
    ),
    CandidatureModule,
    AuthModule,
    UsersModule,
    MailerModule,
    JobOffersModule,
    ApplicationsModule,
    RecruitmentSessionModule,
    TrancheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
