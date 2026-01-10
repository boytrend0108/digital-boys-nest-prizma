import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

// Load .env file from the project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Enable validation globally
  app.setGlobalPrefix('api'); // Set global prefix for all routes

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
