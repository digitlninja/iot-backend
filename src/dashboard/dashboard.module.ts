import { Module } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';
import { CustomerSchema } from '../db/schemas/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { EnvironmentSchema } from 'src/db/schemas/environment.schema';

@Module({
  providers: [DashboardRepository],
  imports: [
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Environment', schema: EnvironmentSchema },
    ]),
  ],
  controllers: [DashboardController],
})
export class DashboardModule {}
