import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverPort } from './config/vars';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Support library
  app.enableCors();

  await app.listen(serverPort || 3000);
}
bootstrap();
