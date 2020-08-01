import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccount } from './userAccount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userAccountsRepository: Repository<UserAccount>,
  ) {}

  findById(id: number): Promise<UserAccount> {
    return this.userAccountsRepository.findOne({ id });
  }
}
