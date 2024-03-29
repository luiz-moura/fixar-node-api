import { injectable, inject } from 'tsyringe';

import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
class ListCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(active?: boolean): Promise<Course[]> {
    const courses = await this.coursesRepository.findAll(active);

    return courses;
  }
}

export default ListCoursesService;
