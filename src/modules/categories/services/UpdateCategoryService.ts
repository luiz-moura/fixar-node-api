import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  category_id: string;
  name: string;
  slug: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    category_id,
    name,
    slug,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category not found');
    }

    const categoryWithUpdatedName = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryWithUpdatedName && categoryWithUpdatedName.id !== category_id) {
      throw new AppError('Name already in use.');
    }

    category.name = name;
    if (slug) category.slug = slug;

    return this.categoriesRepository.save(category);
  }
}

export default UpdateCategoryService;
