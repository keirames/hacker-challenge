import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverPort } from './config/vars';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(serverPort || 3000);
}
bootstrap();
