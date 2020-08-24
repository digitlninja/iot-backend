import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { BadRequestTransformer } from './users/auth/error-transformer.filter';
import { AppConfigService } from './config/configuration.service';

async function bootstrap() {
  // Add node-fetch to globals (used in interfacing with aws)
  global['fetch'] = require('node-fetch');
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: process.env.IOT_UI_URL,
    },
  });

  app.useGlobalFilters(new BadRequestTransformer());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const appConfig: AppConfigService = app.get('AppConfigService');

  await app.listen(appConfig.port);

  console.log(
    '[ThreeSprints IoT API Running on]:',
    `${appConfig.appUrl} - [Environment: ${appConfig.appEnv}]`,
  );
  console.log(
    '[Connected to DB]:',
    appConfig.appEnv === 'nonDocker'
      ? appConfig.databaseUrlNonDocker
      : appConfig.databaseUrl,
  );
}
bootstrap();
