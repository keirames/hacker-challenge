import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { UsersModule } from '../users/users.module';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let app: INestApplication;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        UsersModule,
      ],
      providers: [TasksService],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  afterEach(async () => await app.close());
});
