import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CategoriesRepository from '../repositories/CategoriesRepository';
import CreateCategoryService from '../services/CreateCategoryService';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  const categoriesRepository = getCustomRepository(CategoriesRepository);
  const categories = await categoriesRepository.find();

  return response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  try {
    const { name, slug } = request.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({ name, slug });

    return response.json(category);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default categoriesRouter;
