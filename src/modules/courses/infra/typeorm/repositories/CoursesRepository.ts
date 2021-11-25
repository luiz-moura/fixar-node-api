import { getRepository, Repository } from 'typeorm';

import ICourseRepository from '@modules/courses/repositories/ICoursesRepository';
import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';

import Course from '../entities/Course';

class CourseRepository implements ICourseRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async findAll(active = true): Promise<Course[]> {
    const courses = await this.ormRepository.find({
      where: { active },
      relations: ['ratings'],
    });

    return courses;
  }

  public async findById(
    id: string,
    where?: object,
  ): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne(id, {
      where: { ...where },
      relations: ['ratings'],
    });

    return course;
  }

  public async findByName(
    name: string,
    active = true,
  ): Promise<Course | undefined> {
    const findCourse = await this.ormRepository.findOne({
      where: { name, active },
      relations: ['ratings'],
    });

    return findCourse;
  }

  public async create({
    platform_id,
    instructor_id,
    category_id,
    name,
    about,
    workload,
    certification,
    level,
    price,
    pricing,
    url,
    poster,
    video,
    active,
  }: ICreateCourseDTO): Promise<Course> {
    const course = this.ormRepository.create({
      platform_id,
      instructor_id,
      category_id,
      name,
      about,
      workload,
      certification,
      level,
      price,
      pricing,
      url,
      poster,
      video,
      active,
    });

    await this.ormRepository.save(course);

    return course;
  }

  public async save(course: Course): Promise<Course> {
    return this.ormRepository.save(course);
  }
}

export default CourseRepository;
