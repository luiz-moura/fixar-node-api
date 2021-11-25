import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICoursesRepository from '../repositories/ICoursesRepository';

import Course from '../infra/typeorm/entities/Course';

interface IRequest {
  course_id: string;
  active?: boolean;
}

@injectable()
class ShowCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ course_id, active }: IRequest): Promise<Course> {
    const course = await this.coursesRepository.findById(course_id, { active });

    if (!course) {
      throw new AppError('Course not found');
    }

    return course;
  }
}

export default ShowCourseService;
