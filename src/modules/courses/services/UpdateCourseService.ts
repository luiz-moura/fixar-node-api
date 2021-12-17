import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICoursesRepository from '../repositories/ICoursesRepository';
import Course from '../infra/typeorm/entities/Course';

interface IRequest {
  course_id: string;
  platform_id: string;
  instructor_id: string;
  category_id: string;
  name: string;
  about: string;
  workload: string;
  certification: string;
  level: string;
  price: string;
  pricing: string;
  url: string;
  poster: string;
  video: string;
  name_instructor: string;
  active: boolean;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({
    course_id,
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
    name_instructor,
    active,
  }: IRequest): Promise<Course> {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError('Course not found');
    }

    if (platform_id) course.platform_id = platform_id;
    if (instructor_id) course.instructor_id = instructor_id;
    if (category_id) course.category_id = category_id;

    course.name = name;
    if (about) course.about = about;
    if (workload) course.workload = workload;
    if (certification) course.certification = certification;
    if (level) course.level = level;
    if (price) course.price = price;
    if (pricing) course.pricing = pricing;
    if (url) course.url = url;
    if (poster) course.poster = poster;
    if (video) course.video = video;
    if (name_instructor) course.name_instructor = name_instructor;
    if (active) course.active = active;

    return this.coursesRepository.save(course);
  }
}

export default UpdateProfileService;
