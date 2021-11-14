import AppError from '@shared/errors/AppError';

import FakeCategoryRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';

describe('CreateCategory', () => {
  it('should be able to create a new category', async () => {
    const FakeCategoriesRepository = new FakeCategoryRepository();
    const CreateCategory = new CreateCategoryService(FakeCategoriesRepository);

    const category = await CreateCategory.execute({
      name: 'Marketing',
      slug: 'marketing',
    });

    expect(category).toHaveProperty('id');
    expect(category.name).toBe('Marketing');
  });

  it('should not be able to create two categories on the same name', async () => {
    const fakeCategoriesRepository = new FakeCategoryRepository();
    const createCategory = new CreateCategoryService(fakeCategoriesRepository);

    const categoryName = 'Marketing';

    await createCategory.execute({
      name: categoryName,
      slug: 'marketing',
    });

    expect(
      createCategory.execute({
        name: categoryName,
        slug: 'marketing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
