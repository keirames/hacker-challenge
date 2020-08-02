import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalAuthenticationProvider } from './externalAuthenticationProvider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExternalAuthenticationProvidersService {
  constructor(
    @InjectRepository(ExternalAuthenticationProvider)
    private readonly externalAuthenticationProvidersRepository: Repository<
      ExternalAuthenticationProvider
    >,
  ) {}

  async findById(id: number): Promise<ExternalAuthenticationProvider> {
    return this.externalAuthenticationProvidersRepository.findOne({ id });
  }
}
