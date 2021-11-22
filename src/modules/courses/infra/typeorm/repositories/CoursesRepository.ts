import { getRepository, Repository } from 'typeorm';

import ICourseRepository from '@modules/courses/repositories/ICoursesRepository';
import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';

import Course from '../entities/Course';

class CourseRepository implements ICourseRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async findAll(): Promise<Course[]> {
    const courses = await this.ormRepository.find({});

    return courses;
  }

  public async findById(id: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne(id);

    return course;
  }

  public async findByName(name: string): Promise<Course | undefined> {
    const findCourse = await this.ormRepository.findOne({
      where: { name },
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
    level,
    price,
    pricing,
    url,
  }: ICreateCourseDTO): Promise<Course> {
    const course = this.ormRepository.create({
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

    await this.ormRepository.save(course);

    return course;
  }

  public async save(course: Course): Promise<Course> {
    return this.ormRepository.save(course);
  }
}

export default CourseRepository;
