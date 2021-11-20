import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import ListCategoriesService from './ListCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategories: ListCategoriesService;

describe('ListCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategories = new ListCategoriesService(fakeCategoriesRepository);
  });

  it('should be able to show the categories', async () => {
    const category1 = await fakeCategoriesRepository.create({
      name: 'Tecnologia',
      slug: 'tecnologia',
    });

    const category2 = await fakeCategoriesRepository.create({
      name: 'Marketing',
      slug: 'marketing',
    });

    const categories = await listCategories.execute();

    expect(categories).toEqual([category1, category2]);
  });
});
