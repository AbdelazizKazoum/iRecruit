/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log(process.env.PORT);
console.log(process.env.MONGO_USER);
console.log(process.env.MONGO_PASSWORD);
console.log(process.env.MONGO_HOST);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 4000);
}
bootstrap();

// imports: [
//     MongooseModule.forRoot({
//        uri: 'mongodb://admin:admin@localhost:30000',
//        dbName: 'data'
//     }),
//   ]
