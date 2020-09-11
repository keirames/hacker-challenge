import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ExternalAuthenticationProvider,
  AuthProvider,
} from './externalAuthenticationProvider.entity';
import { ExternalAuthenticationProvidersRepository } from './externalAuthenticationProviders.repository';

@Injectable()
export class ExternalAuthenticationProvidersService {
  constructor(
    @InjectRepository(ExternalAuthenticationProvidersRepository)
    private readonly externalAuthenticationProvidersRepository: ExternalAuthenticationProvidersRepository,
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
