import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('Iot Backend'),
        APP_ENV: Joi.string().valid(
          'development',
          'production',
          'nonDocker',
          'test',
        ),
        APP_URL: Joi.string().default('http://localhost:3001'),
        APP_PORT: Joi.number().default(3001),
        DATABASE_URL: Joi.string().default('mongodb://mongo:27017/iot'),
        DATABASE_URL_NON_DOCKER: Joi.string().default(
          'mongodb://127.0.0.1:27017/iot',
        ),
        IOT_UI_URL: Joi.string().default('http://localhost:3000'),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
