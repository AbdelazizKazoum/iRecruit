/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log('PORT:', process.env.PORT);
console.log('MONGO_USER:', process.env.MONGO_USER);
console.log('MONGO_PASSWORD:', process.env.MONGO_PASSWORD);
console.log('MONGO_HOST:', process.env.MONGO_HOST);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set a global prefix for API routes
  app.setGlobalPrefix('api');

  // Enable CORS with custom configuration
  app.enableCors({
    origin: ['http://localhost:3000', 'http://example.com'], // Allow specific origins
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
    credentials: true, // Allow cookies or authorization headers
  });

  // Start the application
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
