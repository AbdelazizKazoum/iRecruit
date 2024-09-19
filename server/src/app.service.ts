import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! my name is abdelaziz kazoum and this app runs inside a docker container ! ';
  }
}
