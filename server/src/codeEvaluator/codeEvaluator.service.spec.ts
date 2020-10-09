import { Test, TestingModule } from '@nestjs/testing';
import { CodeEvaluatorService } from './codeEvaluator.service';

describe('CodeEvaluatorService', () => {
  let service: CodeEvaluatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeEvaluatorService],
    }).compile();

    service = module.get<CodeEvaluatorService>(CodeEvaluatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
