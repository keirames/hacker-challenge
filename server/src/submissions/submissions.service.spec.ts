import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { Submission } from './submission.entity';
import { SubmissionsService } from './submissions.service';

describe('SubmissionsService', () => {
  let app: INestApplication;
  let submissionsService: SubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        TypeOrmModule.forFeature([Submission]),
      ],
      providers: [SubmissionsService],
    }).compile();

    submissionsService = module.get<SubmissionsService>(SubmissionsService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(submissionsService).toBeDefined();
  });

  afterEach(async () => await app.close());
});
