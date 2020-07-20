import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import { config } from './config';
import { ENVIRONMENT } from './constants';
const { database, server } = config[ENVIRONMENT];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(server.port);

  console.log(
    '[ThreeSprints IoT API Running on]:',
    `http://${server.host}:${server.port} - [Environment: ${ENVIRONMENT}]`,
  );

  console.log('[Connected to DB]:', database.url);
}
bootstrap();
