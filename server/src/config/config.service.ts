import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Config error - missing env.${key}`);
    }

    // env doesnt set, it automatically treat as DEV
    return value ? value : 'DEV';
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort(): string {
    return this.getValue('PORT', true);
  }

  public isProduction(): boolean {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
      logging: !this.isProduction(),
    };
  }

  public getTypeOrmTestConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_TEST_HOST'),
      port: parseInt(this.getValue('POSTGRES_TEST_PORT')),
      username: this.getValue('POSTGRES_TEST_USER'),
      password: this.getValue('POSTGRES_TEST_PASSWORD'),
      database: this.getValue('POSTGRES_TEST_DATABASE'),

      entities: ['**/*.entity{.ts,.js}'],

      dropSchema: true,
      synchronize: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',

  // testing
  'POSTGRES_TEST_HOST',
  'POSTGRES_TEST_PORT',
  'POSTGRES_TEST_USER',
  'POSTGRES_TEST_PASSWORD',
  'POSTGRES_TEST_DATABASE',
]);

export { configService };
