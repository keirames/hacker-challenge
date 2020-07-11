import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, planSchema } from './schemas/plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: planSchema }]),
  ],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
