import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCourseService from '@modules/courses/services/CreateCourseService';
import ListCoursesService from '@modules/courses/services/ListCoursesService';
import UpdateCourseService from '@modules/courses/services/UpdateCourseService';

export default class CoursesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListCoursesService);

    const courses = await listCourses.execute();

    return response.json(courses);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createCourseService = container.resolve(CreateCourseService);

    const course = await createCourseService.execute({
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

    return response.json(course);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { course_id } = request.params;
    const {
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
    } = request.body;

    const updateCourse = container.resolve(UpdateCourseService);

    const instructor = await updateCourse.execute({
      course_id,
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

    return response.json(instructor);
  }
}
