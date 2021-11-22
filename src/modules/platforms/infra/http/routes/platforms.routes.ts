import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PlatformsController from '../controllers/PlatformsController';

const PlatformsRouter = Router();
const platformsController = new PlatformsController();

PlatformsRouter.get('/', platformsController.index);
PlatformsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      about: Joi.string(),
      type: Joi.string().required(),
      url: Joi.string(),
    },
  }),
  ensureAuthenticated,
  platformsController.create,
);
PlatformsRouter.put(
  '/:platform_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      about: Joi.string(),
      type: Joi.string().required(),
      url: Joi.string(),
    },
  }),
  ensureAuthenticated,
  platformsController.update,
);

export default PlatformsRouter;
