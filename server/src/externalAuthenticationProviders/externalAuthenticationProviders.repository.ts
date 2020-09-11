import { EntityRepository, Repository } from 'typeorm';
import { ExternalAuthenticationProvider } from './externalAuthenticationProvider.entity';

@EntityRepository(ExternalAuthenticationProvider)
export class ExternalAuthenticationProvidersRepository extends Repository<
  ExternalAuthenticationProvider
> {
  async deohieu(): Promise<void> {
    return;
  }
}
