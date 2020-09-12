import { forwardRef, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { UsersModule } from '../users/users.module';
import { ChallengesModule } from './challenges.module';
import { ChallengesResolver } from './challenges.resolver';

describe('ChallengesResolver', () => {
  let app: INestApplication;
  let resolver: ChallengesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        forwardRef(() => ChallengesModule),
        forwardRef(() => UsersModule),
      ],
      providers: [],
    }).compile();

    resolver = module.get<ChallengesResolver>(ChallengesResolver);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => await app.close());
});
