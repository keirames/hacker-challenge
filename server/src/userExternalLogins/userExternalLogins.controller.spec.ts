import { Test, TestingModule } from '@nestjs/testing';
import { UserExternalLoginsController } from './userExternalLogins.controller';

describe('UserExternalLogins Controller', () => {
  let controller: UserExternalLoginsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExternalLoginsController],
    }).compile();

    controller = module.get<UserExternalLoginsController>(
      UserExternalLoginsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
