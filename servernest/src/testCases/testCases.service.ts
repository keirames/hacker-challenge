import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestCase } from './testCase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestCasesService {}
