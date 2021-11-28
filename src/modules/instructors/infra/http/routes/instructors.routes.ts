import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import InstructorsController from '../controllers/InstructorsController';

const instructorsRouter = Router();
const instructorsController = new InstructorsController();

instructorsRouter.get('/', instructorsController.index);
instructorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      about: Joi.string(),
      url: Joi.string(),
      linkedin: Joi.string(),
    },
  }),
  ensureAuthenticated,
  instructorsController.create,
);
instructorsRouter.put(
  '/:instructor_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      about: Joi.string(),
      url: Joi.string(),
      linkedin: Joi.string(),
    },
  }),
  ensureAuthenticated,
  instructorsController.update,
);

export default instructorsRouter;
