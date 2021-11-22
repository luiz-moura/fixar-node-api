import Course from '../infra/typeorm/entities/Course';
import ICreateCourseDTO from '../dtos/ICreateCourseDTO';

export default interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
  save(user: Course): Promise<Course>;
  findById(id: string): Promise<Course | undefined>;
  findAll(): Promise<Course[]>;
  findByName(name: string): Promise<Course | undefined>;
}
