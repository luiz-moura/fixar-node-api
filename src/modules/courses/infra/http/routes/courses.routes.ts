import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CoursesController from '../controllers/CoursesController';

const CoursesRouter = Router();
const coursesController = new CoursesController();

CoursesRouter.get('/', coursesController.index);
CoursesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      platform_id: Joi.string().uuid().required(),
      instructor_id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      about: Joi.string(),
      workload: Joi.string(),
      level: Joi.string(),
      price: Joi.string(),
      pricing: Joi.string(),
      url: Joi.string(),
    },
  }),
  ensureAuthenticated,
  coursesController.create,
);
CoursesRouter.put(
  '/:course_id',
  celebrate({
    [Segments.BODY]: {
      platform_id: Joi.string().uuid(),
      instructor_id: Joi.string().uuid(),
      category_id: Joi.string().uuid(),
      name: Joi.string(),
      about: Joi.string(),
      workload: Joi.string(),
      level: Joi.string(),
      price: Joi.string(),
      pricing: Joi.string(),
      url: Joi.string(),
    },
  }),
  ensureAuthenticated,
  coursesController.update,
);

export default CoursesRouter;
