import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SupportsController from '../controllers/SupportsController';

const supportsRouter = Router();
const supportsController = new SupportsController();

supportsRouter.get('/', ensureAuthenticated, supportsController.index);
supportsRouter.get(
  '/show/:support_id',
  ensureAuthenticated,
  supportsController.show,
);
supportsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().required(),
      message: Joi.string(),
      email: Joi.string().required(),
    },
  }),
  supportsController.create,
);

export default supportsRouter;
