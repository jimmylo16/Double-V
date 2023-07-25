import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger('Bootstrap');
  await app.listen(process.env.PORT || 3001);
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
