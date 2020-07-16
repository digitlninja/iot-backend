import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, ICustomer } from './interfaces/Customer';
import { Environment } from './interfaces/Environment';
import { CreateEnvironmentDTO } from './dtos/create-environment.dto';

@Injectable()
export class DashboardRepository {
  constructor(
    @InjectModel('Customer') private customerModel: Model<Customer>,
    @InjectModel('Environment') private environmentModel: Model<Environment>,
  ) {}

  async findAll(
    options: { includeEnvironments: boolean } = { includeEnvironments: false },
  ): Promise<Customer[]> {
    const customers = this.customerModel.find();
    if (options.includeEnvironments) {
      customers.populate('environments');
    }
    if (!customers) {
      throw new Error('Customers not found');
    }
    return customers;
  }

  async findCustomer(
    id: string,
    options: { includeEnvironments: boolean } = { includeEnvironments: false },
  ): Promise<Customer> {
    const customer = this.customerModel.findById(id);
    if (options.includeEnvironments) {
      customer.populate('environments');
    }
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }

  async createEnvironments(
    createEnvironmentsDTO: CreateEnvironmentDTO[],
  ): Promise<Environment[]> {
    const createdEnvironments = this.environmentModel.insertMany(
      createEnvironmentsDTO,
    );
    return createdEnvironments;
  }

  async createCustomer(createCustomerDTO: ICustomer): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDTO);
    return createdCustomer.save();
  }

  async delete(id: string): Promise<Customer> {
    return this.customerModel.findOneAndDelete({ _id: id });
  }

  async deleteAll(): Promise<void> {
    this.customerModel.deleteMany({});
  }
}
