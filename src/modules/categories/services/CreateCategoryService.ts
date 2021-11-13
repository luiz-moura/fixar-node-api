import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Category from '../infra/typeorm/entities/Category';
import CategoriesRepository from '../repositories/CategoriesRepository';

interface Request {
  name: string;
  slug: string;
}

class CreateCategoryService {
  public async execute({ name, slug }: Request): Promise<Category> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const findCategory = await categoriesRepository.findByName(name);

    if (findCategory) {
      throw new AppError('This category alredy exists');
    }

    const category = categoriesRepository.create({
      name,
      slug,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
