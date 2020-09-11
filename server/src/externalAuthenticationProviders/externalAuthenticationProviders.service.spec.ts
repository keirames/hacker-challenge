import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthProvider,
  ExternalAuthenticationProvider,
} from './externalAuthenticationProvider.entity';
import { ExternalAuthenticationProvidersRepository } from './externalAuthenticationProviders.repository';
import { ExternalAuthenticationProvidersService } from './externalAuthenticationProviders.service';

describe('ExternalAuthenticationProvidersService', () => {
  let app: INestApplication;
  let externalAuthenticationProvidersService: ExternalAuthenticationProvidersService;
  let externalAuthenticationProvidersRepository: ExternalAuthenticationProvidersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 2345,
          username: 'postgres',
          password: '1234',
          database: 'hacker_challenge_test',
          entities: ['**/*.entity{.ts,.js}'],
          dropSchema: true,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([ExternalAuthenticationProvidersRepository]),
      ],
      providers: [ExternalAuthenticationProvidersService],
    }).compile();

    externalAuthenticationProvidersService = module.get<
      ExternalAuthenticationProvidersService
    >(ExternalAuthenticationProvidersService);
    // same as repository = getCustomRepository(ExternalAuthenticationProvidersRepository);
    externalAuthenticationProvidersRepository = module.get(
      'ExternalAuthenticationProvidersRepository',
    );
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', async () => {
    expect(externalAuthenticationProvidersService).toBeDefined();
  });

  describe('findById', () => {
    it('should be return a provider', async () => {
      let facebook = new ExternalAuthenticationProvider({
        name: AuthProvider.FACEBOOK,
      });
      facebook = await externalAuthenticationProvidersRepository.save(facebook);

      const result = await externalAuthenticationProvidersService.findById(
        facebook.id,
      );

      expect(result).toMatchObject(facebook);
    });

    it('should be return undefined if invalid id is passed', async () => {
      const result = await externalAuthenticationProvidersService.findById(1);

      expect(result).toBeUndefined();
    });
  });

  describe('findByName', () => {
    it('should be return a provider', async () => {
      let facebook = new ExternalAuthenticationProvider({
        name: AuthProvider.FACEBOOK,
      });
      facebook = await externalAuthenticationProvidersRepository.save(facebook);

      const result = await externalAuthenticationProvidersService.findByName(
        facebook.name,
      );

      expect(result).toMatchObject(facebook);
    });

    it('should be return undefined if invalid name is passed', async () => {
      const result = await externalAuthenticationProvidersService.findByName(
        'invalidName' as any,
      );

      expect(result).toBeUndefined();
    });
  });

  afterEach(async () => await app.close());
});
