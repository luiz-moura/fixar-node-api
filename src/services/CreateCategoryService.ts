import { getCustomRepository } from 'typeorm';

import Category from '../models/Category';
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
      throw Error('This category alredy exists');
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
