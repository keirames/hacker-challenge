import { forwardRef, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { UsersModule } from '../users/users.module';
import { ChallengesModule } from './challenges.module';
import { ChallengesService } from './challenges.service';

describe('ChallengesService', () => {
  let app: INestApplication;
  let service: ChallengesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        forwardRef(() => ChallengesModule),
        forwardRef(() => UsersModule),
      ],
      providers: [],
    }).compile();

    service = module.get<ChallengesService>(ChallengesService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => await app.close());
});
