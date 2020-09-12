import { Module } from '@nestjs/common';
import { TestCasesService } from './testCases.service';

@Module({
  controllers: [],
  providers: [TestCasesService],
})
export class TestCasesModule {}
