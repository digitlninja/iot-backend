import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { ENVIRONMENT } from './constants';
import { ValidationPipe } from '@nestjs/common';
const { database, server } = config[ENVIRONMENT];
import cookieParser from 'cookie-parser';
import { BadRequestTransformer } from './users/auth/error-transformer.filter';

async function bootstrap() {
  const appUrl = process.env.APP_URL || 'http://localhost:3001';

  // Add node-fetch to globals (used in interfacing with aws)
  global['fetch'] = require('node-fetch');
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: process.env.IOT_UI_URL || 'http://localhost:3000',
    },
  });
  app.useGlobalFilters(new BadRequestTransformer());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(server.port);

  console.log(
    '[ThreeSprints IoT API Running on]:',
    `${appUrl} - [Environment: ${ENVIRONMENT}]`,
  );
  console.log('[Connected to DB]:', database.url);
}
bootstrap();
