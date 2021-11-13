import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.use(ensureAuthenticated);

// categoriesRouter.get('/', async (request, response) => {
//   const categories = await categoriesRepository.find();

//   return response.json(categories);
// });

categoriesRouter.post('/', categoriesController.create);

export default categoriesRouter;
