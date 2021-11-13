import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  status: boolean;
  type: string;
}

class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    name,
    email,
    password,
    status,
    type,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      status,
      type,
    });

    return user;
  }
}

export default CreateUserService;
