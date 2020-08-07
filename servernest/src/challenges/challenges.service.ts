import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { Repository } from 'typeorm';
import { AddChallengeInput } from './input/addChallengeInput.input';
import slugify from 'slugify';
import { Contest } from '../contests/contest.entity';
import { EditChallengeInput } from './input/editChallengeInput.input';
import { MarkLikeChallengeInput } from './input/markLikeChallengeInput';
import { User } from '../users/user.entity';

interface Options {
  isDeleted?: boolean;
}

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengesRepository: Repository<Challenge>,

    @InjectRepository(Contest)
    private readonly contestsRepository: Repository<Contest>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(options: Options = {}): Promise<Challenge[]> {
    console.log({ ...options });
    return this.challengesRepository.find({ ...options });
  }

  findById(id: number, options: Options = {}): Promise<Challenge | undefined> {
    return this.challengesRepository.findOne({ id, ...options });
  }

  findBySlug(
    slug: string,
    options: Options = {},
  ): Promise<Challenge | undefined> {
    return this.challengesRepository.findOne({ slug, ...options });
  }

  findByTitle(
    title: string,
    options: Options = {},
  ): Promise<Challenge | undefined> {
    return this.challengesRepository.findOne({ title, ...options });
  }

  findByContestId(
    contestId: number,
    options: Options = {},
  ): Promise<Challenge[]> {
    return this.challengesRepository.find({ contestId, ...options });
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

    let challenge = await this.findByTitle(title);
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

  async editChallenge(challengeInput: EditChallengeInput): Promise<Challenge> {
    const {
      id,
      title,
      problem,
      inputFormat,
      outputFormat,
      level,
      points,
      challengeSeed,
      testCases,
      contestId,
    } = challengeInput;

    let challenge = await this.findById(id);
    if (!challenge)
      throw new HttpException(`Invalid challenge's id`, HttpStatus.NOT_FOUND);

    // andWhere incase it query it's own
    // It own title will be replace anyway
    challenge = await this.challengesRepository
      .createQueryBuilder('challenge')
      .where('challenge.title = :title', { title })
      .andWhere('challenge.id != :id', { id })
      .getOne();
    if (challenge)
      throw new HttpException('Title is already exist', HttpStatus.CONFLICT);

    // andWhere incase it query it's own
    // It own slug will be replace anyway
    const slug = slugify(title, { replacement: '-', lower: true });
    const checkSlug = await this.challengesRepository
      .createQueryBuilder('challenge')
      .where('challenge.slug = :slug', { slug })
      .andWhere('challenge.id != :id', { id })
      .getOne();
    if (checkSlug)
      throw new HttpException(
        'Title creates an existed slug',
        HttpStatus.CONFLICT,
      );

    const contest = await this.contestsRepository.findOne({ id: contestId });
    if (!contest)
      throw new HttpException(`Invalid contest's id`, HttpStatus.CONFLICT);

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
    challenge.id = id;
    challenge.updatedAt = new Date();
    return this.challengesRepository.save(challenge);
  }

  async likeOrUnlikeChallenge(
    markLikeInput: MarkLikeChallengeInput,
  ): Promise<Challenge> {
    const { challengeId, userId } = markLikeInput;

    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        'user.likedChallenges',
        'likedChallenge',
        'user.id = :userId',
        { userId },
      )
      .where('likedChallenge.isDeleted = :isDeleted', { isDeleted: false })
      .getOne();
    if (!user)
      throw new HttpException(`Invalid user's id`, HttpStatus.NOT_FOUND);

    const challenge = await this.findById(challengeId, { isDeleted: false });
    if (!challenge)
      throw new HttpException(`Invalid challenge's id`, HttpStatus.NOT_FOUND);

    const index = user.likedChallenges.findIndex(c => c.id === challengeId);
    // Mark like
    if (index === -1) {
      user.likedChallenges.push(challenge);
      await this.usersRepository.save(user);
      return challenge;
    }

    // Unlike
    const modifiedLikedChallenges = user.likedChallenges.filter(
      c => c.id !== challengeId,
    );
    user.likedChallenges = [...modifiedLikedChallenges];
    await this.usersRepository.save(user);
    return challenge;
  }
}
