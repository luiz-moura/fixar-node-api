import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeCategoriesRepository = new FakeUsersRepository();
    const createCategory = new CreateUserService(fakeCategoriesRepository);

    const user = await createCategory.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      status: true,
      type: 'admin',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user same email from another', async () => {
    const fakeCategoriesRepository = new FakeUsersRepository();
    const createCategory = new CreateUserService(fakeCategoriesRepository);

    await createCategory.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      status: true,
      type: 'admin',
    });

    expect(
      createCategory.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        status: true,
        type: 'admin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
