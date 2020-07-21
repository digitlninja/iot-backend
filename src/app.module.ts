import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENVIRONMENT } from './constants';
import { config } from './config';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users/users.module';
import { join } from 'path';
import { AuthService } from './users/auth/auth.service';
import { AuthConfig } from './users/auth/auth.config';
const environment = config[ENVIRONMENT];

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(environment.database.url),
    DashboardModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, AuthConfig],
})
export class AppModule {}
