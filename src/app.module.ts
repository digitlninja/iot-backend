import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AuthService } from './users/auth/auth.service';
import { AuthConfig } from './users/auth/auth.config';
import configuration from './config/configuration';
import { AppConfigService } from './config/configuration.service';
import { AppConfigModule } from './config/app-config.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        emitTypenameField: true,
      },
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: process.env.IOT_UI_URL || 'http://localhost:3000',
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        uri:
          appConfigService.appEnv === 'nonDocker'
            ? appConfigService.databaseUrlNonDocker
            : appConfigService.databaseUrl,
      }),
      inject: [AppConfigService],
    }),
    DashboardModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, AuthConfig],
})
export class AppModule {}
