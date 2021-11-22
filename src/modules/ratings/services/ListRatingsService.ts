import { injectable, inject } from 'tsyringe';

import Rating from '../infra/typeorm/entities/Rating';
import IRatingsRepository from '../repositories/IRatingsRepository';

@injectable()
class ListRatingsService {
  constructor(
    @inject('RatingsRepository')
    private ratingsRepository: IRatingsRepository,
  ) {}

  public async execute(): Promise<Rating[]> {
    const ratings = await this.ratingsRepository.findAll();

    return ratings;
  }
}

export default ListRatingsService;
