import { EntityRepository, Repository } from 'typeorm';
import Category from '../infra/typeorm/entities/Category';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async findByName(name: string): Promise<Category | null> {
    const findCategory = await this.findOne({
      where: { name },
    });

    return findCategory || null;
  }
}

export default CategoriesRepository;
