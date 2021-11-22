import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IPlatformsRepository from '@modules/platforms/repositories/IPlatformsRepository';
import PlatformsRepository from '@modules/platforms/infra/typeorm/repositories/PlatformsRepository';

import IInstructorsRepository from '@modules/instructors/repositories/IInstructorsRepository';
import InstructorsRepository from '@modules/instructors/infra/typeorm/repositories/InstructorsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPlatformsRepository>(
  'PlatformsRepository',
  PlatformsRepository,
);

container.registerSingleton<IInstructorsRepository>(
  'InstructorsRepository',
  InstructorsRepository,
);
