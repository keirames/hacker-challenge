import { Test, TestingModule } from '@nestjs/testing';
import { SolvedChallengesService } from './solvedChallenges.service';

describe('SolvedChallengesService', () => {
  let service: SolvedChallengesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolvedChallengesService],
    }).compile();

    service = module.get<SolvedChallengesService>(SolvedChallengesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
