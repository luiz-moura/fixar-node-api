import Course from '../infra/typeorm/entities/Course';
import ICreateCourseDTO from '../dtos/ICreateCourseDTO';

export default interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
  save(user: Course): Promise<Course>;
  findById(id: string, where?: object): Promise<Course | undefined>;
  findAll(active?: boolean): Promise<Course[]>;
  findByName(name: string, active?: boolean): Promise<Course | undefined>;
}
