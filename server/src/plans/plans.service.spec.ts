import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { configService } from '../config/config.service';
import { Plan } from './plan.entity';
import { PlansService } from './plans.service';

describe('PlansService', () => {
  let app: INestApplication;
  let plansService: PlansService;
  let plansRepository: Repository<Plan>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        TypeOrmModule.forFeature([Plan]),
      ],
      providers: [PlansService],
    }).compile();

    plansService = module.get<PlansService>(PlansService);
    plansRepository = module.get('PlanRepository');

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(plansService).toBeDefined();
  });

  describe('findById', () => {
    it('should be return a plan', async () => {
      let plan = new Plan();
      plan.name = 'testPlan';
      plan.pricePerMonth = 100;
      plan = await plansRepository.save(plan);

      const result = await plansService.findById(plan.id);

      expect(result).toMatchObject(plan);
    });

    it('should be return undefined if invalid id is passed', async () => {
      const result = await plansService.findById(1);

      expect(result).toBeUndefined();
    });
  });

  afterEach(async () => await app.close());
});
