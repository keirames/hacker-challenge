import { Test, TestingModule } from '@nestjs/testing';
import { ExternalAuthenticationProvidersController } from './externalAuthenticationProviders.controller';

describe('ExternalAuthenticationProviders Controller', () => {
  let controller: ExternalAuthenticationProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalAuthenticationProvidersController],
    }).compile();

    controller = module.get<ExternalAuthenticationProvidersController>(
      ExternalAuthenticationProvidersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
