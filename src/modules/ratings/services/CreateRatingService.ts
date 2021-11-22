import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IRatingsRepository from '../repositories/IRatingsRepository';
import Rating from '../infra/typeorm/entities/Rating';

interface IRequest {
  user_id: string;
  course_id: string;
  value: string;
}

@injectable()
class CreateRatingService {
  constructor(
    @inject('RatingsRepository')
    private ratingsRepository: IRatingsRepository,
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    course_id,
    value,
  }: IRequest): Promise<Rating> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can create rating.', 401);
    }

    const findRating = await this.ratingsRepository.find({
      where: {
        user_id,
        course_id,
      },
    });

    if (findRating) {
      throw new AppError('User has already rated this course.', 400);
    }

    const rating = await this.ratingsRepository.create({
      user_id,
      course_id,
      value,
    });

    return rating;
  }
}

export default CreateRatingService;
