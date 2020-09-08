import { Test, TestingModule } from '@nestjs/testing';
import { UserAccountsController } from './userAccounts.controller';

describe('UserAccounts Controller', () => {
  let controller: UserAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAccountsController],
    }).compile();

    controller = module.get<UserAccountsController>(UserAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
