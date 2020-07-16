import {
  Controller,
  Inject,
  Get,
  Post,
  Param,
  Body,
  Delete,
  BadRequestException,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';
import { Customer } from './interfaces/Customer';
import { CreateCustomerDTO } from './dtos/create-customer.dto';
import { CreateEnvironmentDTO } from './dtos/create-environment.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @Inject('DashboardRepository')
    private dashboardRepository: DashboardRepository,
  ) {}

  @Get()
  async findAllCustomers(): Promise<Customer[]> {
    return await this.dashboardRepository.findAll();
  }

  @Get(':id')
  async findCustomer(
    @Param('id') id: string,
    @Query('includeEnvironments', new DefaultValuePipe(true), ParseBoolPipe)
    includeEnvironments,
  ): Promise<Customer> {
    return await this.dashboardRepository.findCustomer(id, {
      includeEnvironments,
    });
  }

  @Post('/environments')
  async createEnvironments(
    @Body()
    createEnvironmentsDTO: CreateEnvironmentDTO[],
  ) {
    return await this.dashboardRepository.createEnvironments(
      createEnvironmentsDTO,
    );
  }

  @Post()
  async createCustomer(
    @Body()
    createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    return await this.dashboardRepository.createCustomer(createCustomerDTO);
  }

  @Delete(':id')
  async delete(@Param() id: string): Promise<void> {
    const deleteDocument = await this.dashboardRepository.delete(id);
    if (!deleteDocument) {
      throw new BadRequestException();
    }
  }
}
