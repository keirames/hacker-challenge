import { Test, TestingModule } from '@nestjs/testing';
import { ContestsResolver } from './contests.resolver';

describe('ContestsResolver', () => {
  let resolver: ContestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContestsResolver],
    }).compile();

    resolver = module.get<ContestsResolver>(ContestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
