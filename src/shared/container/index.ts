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

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import CoursesRepository from '@modules/courses/infra/typeorm/repositories/CoursesRepository';

import IRatingsRepository from '@modules/ratings/repositories/IRatingsRepository';
import RatingsRepository from '@modules/ratings/infra/typeorm/repositories/RatingsRepository';

import ISupportsRepository from '@modules/supports/repositories/ISupportsRepository';
import SupportsRepository from '@modules/supports/infra/typeorm/repositories/SupportsRepository';

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

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  CoursesRepository,
);

container.registerSingleton<IRatingsRepository>(
  'RatingsRepository',
  RatingsRepository,
);

container.registerSingleton<ISupportsRepository>(
  'SupportsRepository',
  SupportsRepository,
);
