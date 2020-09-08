import { Test, TestingModule } from '@nestjs/testing';
import { UserExternalLoginsService } from './userExternalLogins.service';

describe('UserExternalLoginsService', () => {
  let service: UserExternalLoginsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExternalLoginsService],
    }).compile();

    service = module.get<UserExternalLoginsService>(UserExternalLoginsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
