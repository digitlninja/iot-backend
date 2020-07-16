import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ENVIRONMENT } from './constants';
import { config } from './config';
import { DashboardModule } from './dashboard/dashboard.module';
const environment = config[ENVIRONMENT];

@Module({
  imports: [MongooseModule.forRoot(environment.database.url), DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
