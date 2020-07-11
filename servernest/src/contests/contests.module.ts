import { Module } from '@nestjs/common';
import { ContestsService } from './contests.service';
import { ContestsController } from './contests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contest, contestSchema } from './schemas/contest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contest.name, schema: contestSchema }]),
  ],
  providers: [ContestsService],
  controllers: [ContestsController],
})
export class ContestsModule {}
