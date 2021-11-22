import Category from '../infra/typeorm/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

export default interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(user: Category): Promise<Category>;
  findById(id: string): Promise<Category | undefined>;
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
}
