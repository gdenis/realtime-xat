/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './app/modules/auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  //Validates DTO's
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3333;

  const config = new DocumentBuilder()
    .setTitle('Real Time Xat Api')
    .setDescription('The Xat API description')
    .setVersion('1.0')
    .addTag('xat')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  //Set AuthGuard as global guard to all routes.
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
