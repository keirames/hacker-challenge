import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { UserAccount } from './userAccount.entity';
import { UserAccountsService } from './userAccounts.service';

describe('UserAccountsService', () => {
  let app: INestApplication;
  let service: UserAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        TypeOrmModule.forFeature([UserAccount]),
      ],
      providers: [UserAccountsService],
    }).compile();

    service = module.get<UserAccountsService>(UserAccountsService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => await app.close());
});
