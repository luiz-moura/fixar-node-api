import { getRepository, Repository } from 'typeorm';

import IRatingRepository from '@modules/ratings/repositories/IRatingsRepository';
import ICreateRatingDTO from '@modules/ratings/dtos/ICreateRatingDTO';

import Rating from '../entities/Rating';

class RatingRepository implements IRatingRepository {
  private ormRepository: Repository<Rating>;

  constructor() {
    this.ormRepository = getRepository(Rating);
  }

  public async findAll(): Promise<Rating[]> {
    const ratings = await this.ormRepository.find();

    return ratings;
  }

  public async findById(id: string): Promise<Rating | undefined> {
    const rating = await this.ormRepository.findOne(id);

    return rating;
  }

  public async find(params: object): Promise<Rating | undefined> {
    const rating = await this.ormRepository.findOne(params);

    return rating;
  }

  public async create({
    user_id,
    course_id,
    value,
  }: ICreateRatingDTO): Promise<Rating> {
    const rating = this.ormRepository.create({
      user_id,
      course_id,
      value,
    });

    await this.ormRepository.save(rating);

    return rating;
  }

  public async save(rating: Rating): Promise<Rating> {
    return this.ormRepository.save(rating);
  }
}

export default RatingRepository;
