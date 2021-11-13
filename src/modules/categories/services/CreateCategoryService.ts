import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  slug: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name, slug }: IRequest): Promise<Category> {
    const findCategory = await this.categoriesRepository.findByName(name);

    if (findCategory) {
      throw new AppError('This category alredy exists');
    }

    const category = await this.categoriesRepository.create({
      name,
      slug,
    });

    return category;
  }
}

export default CreateCategoryService;
