import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCourseService from '@modules/courses/services/CreateCourseService';
import ListCoursesService from '@modules/courses/services/ListCoursesService';
import UpdateCourseService from '@modules/courses/services/UpdateCourseService';
import ShowCourseService from '@modules/courses/services/ShowCourseService';

export default class CoursesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListCoursesService);

    const onlyActive = true;

    const courses = await listCourses.execute(onlyActive);

    return response.json(classToClass(courses));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { course_id } = request.params;

    const showCourse = container.resolve(ShowCourseService);

    const course = await showCourse.execute({
      course_id,
      active: true,
    });

    return response.json(classToClass(course));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createCourseService = container.resolve(CreateCourseService);

    const course = await createCourseService.execute({
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

    return response.json(classToClass(course));
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
      certification,
      level,
      price,
      pricing,
      url,
      poster,
      video,
      active,
    } = request.body;

    const updateCourse = container.resolve(UpdateCourseService);

    const course = await updateCourse.execute({
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
      active,
    });

    return response.json(classToClass(course));
  }
}
