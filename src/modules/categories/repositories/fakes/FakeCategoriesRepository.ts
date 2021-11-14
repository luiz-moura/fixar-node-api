import { v4 } from 'uuid';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';

import Category from '../../infra/typeorm/entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findByName(name: string): Promise<Category | undefined> {
    const findCategory = this.categories.find(
      category => category.name === name,
    );

    return findCategory;
  }

  public async create({ name, slug }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: v4(), name, slug });

    this.categories.push(category);

    return category;
  }
}

export default CategoriesRepository;
