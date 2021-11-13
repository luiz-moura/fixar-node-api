import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CategoriesRepository from '@modules/categories/repositories/CategoriesRepository';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const categoriesRouter = Router();

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.get('/', async (request, response) => {
  const categoriesRepository = getCustomRepository(CategoriesRepository);
  const categories = await categoriesRepository.find();

  return response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  const { name, slug } = request.body;

  const createCategoryService = new CreateCategoryService();

  const category = await createCategoryService.execute({ name, slug });

  return response.json(category);
});

export default categoriesRouter;
