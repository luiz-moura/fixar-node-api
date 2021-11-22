import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRatingService from '@modules/ratings/services/CreateRatingService';
import ListRatingsService from '@modules/ratings/services/ListRatingsService';
import UpdateRatingService from '@modules/ratings/services/UpdateRatingService';

export default class RatingsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRatings = container.resolve(ListRatingsService);

    const ratings = await listRatings.execute();

    return response.json(ratings);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { course_id, value } = request.body;

    const createRatingService = container.resolve(CreateRatingService);

    const rating = await createRatingService.execute({
      user_id,
      course_id,
      value,
    });

    return response.json(rating);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { rating_id } = request.params;
    const { value } = request.body;

    const updateRating = container.resolve(UpdateRatingService);

    const rating = await updateRating.execute({
      user_id,
      rating_id,
      value,
    });

    return response.json(rating);
  }
}
