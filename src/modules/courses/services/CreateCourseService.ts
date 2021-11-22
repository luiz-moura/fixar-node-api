import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IInstructorsRepository from '@modules/instructors/repositories/IInstructorsRepository';
import IPlatformsRepository from '@modules/platforms/repositories/IPlatformsRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ICoursesRepository from '../repositories/ICoursesRepository';
import Course from '../infra/typeorm/entities/Course';

interface IRequest {
  platform_id: string;
  instructor_id: string;
  category_id: string;
  name: string;
  about: string;
  workload: string;
  level: string;
  price: string;
  pricing: string;
  url: string;
}

@injectable()
class CreateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
    @inject('InstructorsRepository')
    private instructorsRepository: IInstructorsRepository,
    @inject('PlatformsRepository')
    private platformsRepository: IPlatformsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    platform_id,
    instructor_id,
    category_id,
    name,
    about,
    workload,
    level,
    price,
    pricing,
    url,
  }: IRequest): Promise<Course> {
    const findInstructor = await this.instructorsRepository.findById(
      instructor_id,
    );

    if (!findInstructor) {
      throw new AppError('Instructor does not exist.');
    }

    const findPlatform = await this.platformsRepository.findById(platform_id);

    if (!findPlatform) {
      throw new AppError('Platform does not exist.');
    }

    const findCategory = await this.categoriesRepository.findById(category_id);

    if (!findCategory) {
      throw new AppError('Category does not exist.');
    }

    const course = await this.coursesRepository.create({
      platform_id,
      instructor_id,
      category_id,
      name,
      about,
      workload,
      level,
      price,
      pricing,
      url,
    });

    return course;
  }
}

export default CreateCourseService;
