import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { UsersModule } from '../users/users.module';
import { ContestsModule } from './contests.module';
import { ContestsService } from './contests.service';

describe('ContestsService', () => {
  let service: ContestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        forwardRef(() => ContestsModule),
        forwardRef(() => UsersModule),
      ],
      providers: [],
    }).compile();

    service = module.get<ContestsService>(ContestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
