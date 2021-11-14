import AppError from '@shared/errors/AppError';

import FakeCategoryRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoriesRepository: FakeCategoryRepository;
let createCategory: CreateCategoryService;

describe('CreateCategory', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoryRepository();
    createCategory = new CreateCategoryService(fakeCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategory.execute({
      name: 'Marketing',
      slug: 'marketing',
    });

    expect(category).toHaveProperty('id');
    expect(category.name).toBe('Marketing');
  });

  it('should not be able to create two categories on the same name', async () => {
    const categoryName = 'Marketing';

    await createCategory.execute({
      name: categoryName,
      slug: 'marketing',
    });

    await expect(
      createCategory.execute({
        name: categoryName,
        slug: 'marketing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
