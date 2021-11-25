import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.index);
categoriesRouter.get('/show/:category_id', categoriesController.show);
categoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      slug: Joi.string(),
    },
  }),
  ensureAuthenticated,
  categoriesController.create,
);
categoriesRouter.put(
  '/:category_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      slug: Joi.string(),
    },
  }),
  ensureAuthenticated,
  categoriesController.update,
);

export default categoriesRouter;
