import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello my friend ! my name is abdelaziz kazoum and this app runs inside a docker container ! ';
  }
}
