import { Test, TestingModule } from '@nestjs/testing';
import { TestInputsService } from './testInputs.service';

describe('TestInputsService', () => {
  let service: TestInputsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestInputsService],
    }).compile();

    service = module.get<TestInputsService>(TestInputsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
