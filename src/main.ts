import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CreateActorDto } from './actors/dto/create-actor.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Enable validation globally
  app.setGlobalPrefix('api'); // Set global prefix for all routes

  const config = new DocumentBuilder()
    .setTitle('Nest Prisma API')
    .setDescription('The Nest Prisma API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      // include: [AppModule],
      // extraModels: [CreateActorDto],
    });
  SwaggerModule.setup('/docs', app, documentFactory, {
    jsonDocumentUrl: '/docs-json',
    yamlDocumentUrl: '/docs-yaml',
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
