import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserExternalLogin } from './userExternalLogin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserExternalLoginsService {
  constructor(
    @InjectRepository(UserExternalLogin)
    private readonly userExternalLoginsRepository: Repository<
      UserExternalLogin
    >,
  ) {}

  findByUserId(userId: number): Promise<UserExternalLogin[]> {
    return this.userExternalLoginsRepository.find({ userId });
  }
}
