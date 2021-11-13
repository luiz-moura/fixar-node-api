import { getRepository, Repository } from 'typeorm';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';

import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: { name },
    });

    return findCategory;
  }

  public async create({ name, slug }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({ name, slug });

    await this.ormRepository.save(category);

    return category;
  }
}

export default CategoriesRepository;
