import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contest } from './contest.entity';
import { Repository } from 'typeorm';
import { AddContestInput } from './input/addContestInput.input';
import { Challenge } from '../challenges/challenge.entity';
import { ChallengesService } from '../challenges/challenges.service';
import slugify from 'slugify';
import { EditContestInput } from './input/editContestInput.input';

interface Options {
  isDeleted?: boolean;
}

@Injectable()
export class ContestsService {
  constructor(
    @InjectRepository(Contest)
    private readonly contestsRepository: Repository<Contest>,

    @InjectRepository(Challenge)
    private readonly challengesRepository: Repository<Challenge>,

    private readonly challengesService: ChallengesService,
  ) {}

  findAll(options: Options = {}): Promise<Contest[]> {
    return this.contestsRepository.find({ ...options });
  }

  findByName(
    name: string,
    options: Options = {},
  ): Promise<Contest | undefined> {
    return this.contestsRepository.findOne({ name, ...options });
  }

  findBySlug(
    slug: string,
    options: Options = {},
  ): Promise<Contest | undefined> {
    return this.contestsRepository.findOne({ slug, ...options });
  }

  findById(id: number, options: Options = {}): Promise<Contest | undefined> {
    return this.contestsRepository.findOne({ id, ...options });
  }

  async addContest(contestInput: AddContestInput): Promise<Contest> {
    const { name } = contestInput;

    let contest = await this.findByName(name);
    if (contest)
      throw new HttpException('Name is already taken', HttpStatus.CONFLICT);

    const slug = slugify(name, { replacement: '-', lower: true });
    const checkSlug = await this.findBySlug(slug);
    if (checkSlug)
      throw new HttpException(
        'Name creates an existed slug',
        HttpStatus.CONFLICT,
      );

    contest = new Contest({ name, slug });
    return this.contestsRepository.save(contest);
  }

  async editContest(contestInput: EditContestInput): Promise<Contest> {
    const { id, name } = contestInput;

    let contest = await this.findById(id);
    if (!contest)
      throw new HttpException(`Invalid contest's id`, HttpStatus.NOT_FOUND);

    contest = await this.contestsRepository
      .createQueryBuilder('contest')
      .where('contest.name = :name', { name })
      .andWhere('contest.id != :id', { id })
      .getOne();
    console.log(contest);
    if (contest)
      throw new HttpException('Name is already taken', HttpStatus.CONFLICT);

    const slug = slugify(name, { replacement: '-', lower: true });
    const checkSlug = await this.contestsRepository
      .createQueryBuilder('contest')
      .where('contest.name = :slug', { slug })
      .andWhere('contest.id != :id', { id })
      .getOne();
    if (checkSlug)
      throw new HttpException(
        'Name creates an existed slug',
        HttpStatus.CONFLICT,
      );

    contest = new Contest({ name, slug });
    contest.id = id;
    contest.updatedAt = new Date();
    return this.contestsRepository.save(contest);
  }
}
