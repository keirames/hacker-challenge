import { Test, TestingModule } from '@nestjs/testing';
import { UserAccountsService } from './userAccounts.service';

describe('UserAccountsService', () => {
  let service: UserAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAccountsService],
    }).compile();

    service = module.get<UserAccountsService>(UserAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
