import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { ExternalAuthenticationProvidersModule } from '../externalAuthenticationProviders/externalAuthenticationProviders.module';
import { UserExternalLoginsResolver } from './userExternalLogins.resolver';

describe('UserExternalLoginsResolver', () => {
  let app: INestApplication;
  let resolver: UserExternalLoginsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        ExternalAuthenticationProvidersModule,
      ],
      providers: [UserExternalLoginsResolver],
    }).compile();

    resolver = module.get<UserExternalLoginsResolver>(
      UserExternalLoginsResolver,
    );

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => await app.close());
});
