import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { ExternalAuthenticationProvider } from './externalAuthenticationProvider.entity';
import { ExternalAuthenticationProvidersService } from './externalAuthenticationProviders.service';

describe('ExternalAuthenticationProvidersService', () => {
  let service: ExternalAuthenticationProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        // TypeOrmModule.forFeature([ExternalAuthenticationProvider]),
      ],
      providers: [ExternalAuthenticationProvidersService],
    }).compile();

    // service = module.get<ExternalAuthenticationProvidersService>(
    //   ExternalAuthenticationProvidersService,
    // );
    service = await module.resolve(ExternalAuthenticationProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
