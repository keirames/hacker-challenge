import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ExternalAuthenticationProvider,
  AuthProvider,
} from './externalAuthenticationProvider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExternalAuthenticationProvidersService {
  constructor(
    @InjectRepository(ExternalAuthenticationProvider)
    private readonly externalAuthenticationProvidersRepository: Repository<
      ExternalAuthenticationProvider
    >,
  ) {}

  async findById(
    id: number,
  ): Promise<ExternalAuthenticationProvider | undefined> {
    return this.externalAuthenticationProvidersRepository.findOne({ id });
  }

  async findByName(
    name: AuthProvider,
  ): Promise<ExternalAuthenticationProvider | undefined> {
    return this.externalAuthenticationProvidersRepository.findOne({ name });
  }
}
