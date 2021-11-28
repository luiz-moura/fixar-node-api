import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PlatformsController from '../controllers/PlatformsController';

const platformsRouter = Router();
const platformsController = new PlatformsController();

platformsRouter.get('/', platformsController.index);
platformsRouter.get('/show/:platform_id', platformsController.show);
platformsRouter.post(
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
platformsRouter.put(
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

export default platformsRouter;
