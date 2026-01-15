/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set a global prefix for API routes
  app.setGlobalPrefix('api');

  // Enable CORS with custom configuration
  const origins = 'http://localhost:3001';
  const allowedOrigins = origins
    ? origins.split(',').map((origin) => origin.trim())
    : [];
  app.enableCors({
    origin: allowedOrigins.length ? allowedOrigins : true, // Allow specific origins
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
    credentials: true, // Allow cookies or authorization headers
  });

  // Start the application
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
