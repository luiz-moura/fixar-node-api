import { Router } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const categoriesRouter = Router();

categoriesRouter.use(ensureAuthenticated);

// categoriesRouter.get('/', async (request, response) => {
//   const categories = await categoriesRepository.find();

//   return response.json(categories);
// });

categoriesRouter.post('/', async (request, response) => {
  const { name, slug } = request.body;

  const createCategoryService = container.resolve(CreateCategoryService);

  const category = await createCategoryService.execute({ name, slug });

  return response.json(category);
});

export default categoriesRouter;
