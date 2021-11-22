import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RatingsController from '../controllers/RatingsController';

const ratingsRouter = Router();
const ratingsController = new RatingsController();

ratingsRouter.get('/', ratingsController.index);
ratingsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      course_id: Joi.string().uuid().required(),
      value: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  ratingsController.create,
);
ratingsRouter.put(
  '/:rating_id',
  celebrate({
    [Segments.BODY]: {
      value: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  ratingsController.update,
);

export default ratingsRouter;
