import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { Repository } from 'typeorm';
import { AddChallengeInput } from './input/addChallengeInput.input';
import slugify from 'slugify';
import { Contest } from '../contests/contest.entity';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengesRepository: Repository<Challenge>,

    @InjectRepository(Contest)
    private readonly contestsRepository: Repository<Contest>,
  ) {}

  findAll(): Promise<Challenge[]> {
    return this.challengesRepository.find({ isDeleted: false });
  }

  findById(id: number): Promise<Challenge | undefined> {
    return this.challengesRepository.findOne({ id, isDeleted: false });
  }

  findBySlug(slug: string): Promise<Challenge | undefined> {
    return this.challengesRepository.findOne({ slug, isDeleted: false });
  }

  findByContestId(contestId: number): Promise<Challenge[]> {
    return this.challengesRepository.find({ contestId, isDeleted: false });
  }

  async addChallenge(challengeInput: AddChallengeInput): Promise<Challenge> {
    const {
      title,
      inputFormat,
      outputFormat,
      problem,
      challengeSeed,
      level,
      points,
      testCases,
      contestId,
    } = challengeInput;

    let challenge = await this.challengesRepository.findOne({ title });
    if (challenge)
      throw new HttpException('Title is already taken', HttpStatus.CONFLICT);

    const slug = slugify(title, { replacement: '-', lower: true });
    const checkSlug = await this.challengesRepository.findOne({ slug });
    if (checkSlug)
      throw new HttpException(
        'Title creates an existed slug',
        HttpStatus.CONFLICT,
      );

    const contest = await this.contestsRepository.findOne({ id: contestId });
    if (!contest)
      throw new HttpException(`Invalid contest'id`, HttpStatus.CONFLICT);

    challenge = new Challenge({
      title,
      slug,
      problem,
      inputFormat,
      outputFormat,
      challengeSeed,
      level,
      points,
      contest,
      testCases,
    });
    return this.challengesRepository.save(challenge);
  }
}
