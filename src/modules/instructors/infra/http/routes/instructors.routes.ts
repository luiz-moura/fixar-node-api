import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import InstructorsController from '../controllers/InstructorsController';

const InstructorsRouter = Router();
const instructorsController = new InstructorsController();

InstructorsRouter.get('/', instructorsController.index);
InstructorsRouter.post(
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
InstructorsRouter.put(
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

export default InstructorsRouter;
