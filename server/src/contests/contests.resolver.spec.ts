import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesModule } from '../challenges/challenges.module';
import { configService } from '../config/config.service';
import { UsersModule } from '../users/users.module';
import { ContestsModule } from './contests.module';
import { ContestsResolver } from './contests.resolver';

describe('ContestsResolver', () => {
  let resolver: ContestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        forwardRef(() => ContestsModule),
        forwardRef(() => UsersModule),
      ],
      providers: [],
    }).compile();

    resolver = module.get<ContestsResolver>(ContestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
