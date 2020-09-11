import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(private readonly usersService: UsersService) {}

  //   @Cron(CronExpression.EVERY_10_MINUTES)
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  removeInactiveAccount(): void {
    this.usersService.removeInactiveAccounts();
  }
}
