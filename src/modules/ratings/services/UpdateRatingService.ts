import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IRatingsRepository from '../repositories/IRatingsRepository';
import Rating from '../infra/typeorm/entities/Rating';

interface IRequest {
  user_id: string;
  rating_id: string;
  value: string;
}

@injectable()
class UpdateRatingService {
  constructor(
    @inject('RatingsRepository')
    private ratingsRepository: IRatingsRepository,
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    rating_id,
    user_id,
    value,
  }: IRequest): Promise<Rating> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can update rating.', 401);
    }

    const rating = await this.ratingsRepository.findById(rating_id);

    if (!rating) {
      throw new AppError('Rating not found');
    }

    rating.value = value;

    return this.ratingsRepository.save(rating);
  }
}

export default UpdateRatingService;
