import { DashboardRepository } from './dashboard.repository';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from '../db/schemas/customer.schema';
import { CreateEnvironmentDTO } from './dtos/create-environment.dto';
import { ICustomer } from './interfaces/Customer';
import { EnvironmentSchema } from '../db/schemas/environment.schema';

// TODO: Get tests running in docker
describe('DashboardRepository', () => {
  let dashboardRepository: DashboardRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/iot',
        ),
        MongooseModule.forFeature([
          { name: 'Customer', schema: CustomerSchema },
          { name: 'Environment', schema: EnvironmentSchema },
        ]),
      ],
      providers: [DashboardRepository],
    }).compile();
    dashboardRepository = module.get<DashboardRepository>(DashboardRepository);
  });

  describe('create customer', () => {
    it('should create and return a customer', async () => {
      const testCustomer: ICustomer = {
        name: 'Bokmakierie Holdings (Pty) Ltd',
      };
      const testEnvironments: CreateEnvironmentDTO[] = [
        {
          name: 'My Environment 1',
          slug: 'www.myenv1.co.za',
        },
        {
          name: 'My Environment 2',
          slug: 'www.myenv2.co.za',
        },
      ];

      const createdCustomer = await dashboardRepository.createCustomer(
        testCustomer,
      );

      const createdEnvironments = await dashboardRepository.createEnvironments(
        testEnvironments,
      );
      const createdEnvironmentsIds = createdEnvironments.map(
        environment => environment._id,
      );

      // Link environments to customer
      createdCustomer.environments = [
        ...createdCustomer.environments,
        ...createdEnvironmentsIds,
      ];
      await createdCustomer.save();

      const result = await dashboardRepository.findCustomer(
        createdCustomer._id,
      );

      expect(result.environments[0]).toEqual(createdEnvironmentsIds[0]);
      expect(result.environments[1]).toEqual(createdEnvironmentsIds[1]);
    });
  });

  describe('create customer and include environments', () => {
    it('should create and return a customer with environments', async () => {
      // Create customer first (needs to exist first)
      const testCustomer: ICustomer = {
        name: 'Zuma Holdings (Pty) Ltd',
      };
      const testEnvironments: CreateEnvironmentDTO[] = [
        {
          name: 'Nkandla 1',
          slug: 'www.Nkandla1.co.za',
        },
        {
          name: 'Nkandla 2',
          slug: 'www.Nkandla2.co.za',
        },
      ];

      const createdCustomer = await dashboardRepository.createCustomer(
        testCustomer,
      );
      const createdEnvironments = await dashboardRepository.createEnvironments(
        testEnvironments,
      );
      const createdEnvironmentsIds = createdEnvironments.map(
        environment => environment._id,
      );

      // Link environments to customer
      createdCustomer.environments = [
        ...createdCustomer.environments,
        ...createdEnvironmentsIds,
      ];
      await createdCustomer.save();

      const result = await dashboardRepository.findCustomer(
        createdCustomer._id,
        { includeEnvironments: true },
      );
      expect(result.environments[0].toObject()).toEqual(
        createdEnvironments[0].toObject(),
      );
    });
  });
});
