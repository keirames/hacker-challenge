import { Test, TestingModule } from '@nestjs/testing';
import { ContestsController } from './contests.controller';

describe('Contests Controller', () => {
  let controller: ContestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContestsController],
    }).compile();

    controller = module.get<ContestsController>(ContestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
