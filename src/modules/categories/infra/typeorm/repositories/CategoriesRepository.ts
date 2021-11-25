import { getRepository, Repository } from 'typeorm';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';

import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findById(id: string): Promise<Category | undefined> {
    const instructor = await this.ormRepository.findOne(id, {
      relations: ['courses'],
    });

    return instructor;
  }

  public async findAll(): Promise<Category[]> {
    const categories = await this.ormRepository.find({
      relations: ['courses'],
    });

    return categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: { name },
      relations: ['courses'],
    });

    return findCategory;
  }

  public async create({ name, slug }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({ name, slug });

    await this.ormRepository.save(category);

    return category;
  }

  public async save(instructor: Category): Promise<Category> {
    return this.ormRepository.save(instructor);
  }
}

export default CategoriesRepository;
