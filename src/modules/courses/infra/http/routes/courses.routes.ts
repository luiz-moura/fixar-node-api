import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CoursesController from '../controllers/CoursesController';

const coursesRouter = Router();
const coursesController = new CoursesController();

coursesRouter.get('/', coursesController.index);
coursesRouter.get('/show/:course_id', coursesController.show);
coursesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      platform_id: Joi.string().uuid().required(),
      instructor_id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      about: Joi.string().required(),
      workload: Joi.string().required(),
      certification: Joi.string().required(),
      level: Joi.string(),
      price: Joi.string().allow(null, ''),
      pricing: Joi.string(),
      url: Joi.string(),
      poster: Joi.string().allow(null, ''),
      video: Joi.string().allow(null, ''),
      active: Joi.boolean().allow(null, ''),
    },
  }),
  ensureAuthenticated,
  coursesController.create,
);
coursesRouter.put(
  '/:course_id',
  celebrate({
    [Segments.BODY]: {
      platform_id: Joi.string().uuid(),
      instructor_id: Joi.string().uuid(),
      category_id: Joi.string().uuid(),
      name: Joi.string(),
      about: Joi.string(),
      workload: Joi.string(),
      certification: Joi.string().required(),
      level: Joi.string(),
      price: Joi.string(),
      pricing: Joi.string(),
      url: Joi.string(),
      poster: Joi.string(),
      video: Joi.string(),
      active: Joi.boolean(),
    },
  }),
  ensureAuthenticated,
  coursesController.update,
);

export default coursesRouter;
