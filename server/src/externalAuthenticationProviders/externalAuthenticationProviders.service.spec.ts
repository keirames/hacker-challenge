import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { ExternalAuthenticationProvidersRepository } from './externalAuthenticationProviders.repository';
import { ExternalAuthenticationProvidersService } from './externalAuthenticationProviders.service';

describe('ExternalAuthenticationProvidersService', () => {
  let service: ExternalAuthenticationProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
      providers: [
        ExternalAuthenticationProvidersService,
        {
          provide: 'ExternalAuthenticationProvidersRepository',
          useValue: ExternalAuthenticationProvidersRepository,
        },
      ],
    }).compile();

    service = module.get<ExternalAuthenticationProvidersService>(
      ExternalAuthenticationProvidersService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  // describe('findById', () => {
  //   it('should return externalAuthenticationProvider', () => {
  //     // const result = 'provider';
  //     // jest.spyOn(service, 'findById');
  //     console.log(service);
  //     // service.findById = jest.fn();
  //   });
  // });
});
