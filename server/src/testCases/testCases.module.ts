import { Module } from '@nestjs/common';
import { TestCasesController } from './testCases.controller';
import { TestCasesService } from './testCases.service';

@Module({
  controllers: [TestCasesController],
  providers: [TestCasesService],
})
export class TestCasesModule {}
