import { Module } from '@nestjs/common';
import { CodeEvaluatorService } from './codeEvaluator.service';

@Module({
  providers: [CodeEvaluatorService],
  exports: [CodeEvaluatorService],
})
export class CodeEvaluatorModule {}
