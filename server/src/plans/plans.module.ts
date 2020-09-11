import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}
