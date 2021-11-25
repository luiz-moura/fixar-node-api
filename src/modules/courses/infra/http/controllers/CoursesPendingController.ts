import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListCoursesService from '@modules/courses/services/ListCoursesService';
import ShowCourseService from '@modules/courses/services/ShowCourseService';

export default class CoursesPendingController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListCoursesService);

    const active = false;

    const courses = await listCourses.execute(active);

    return response.json(classToClass(courses));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { course_id } = request.params;

    const showCourse = container.resolve(ShowCourseService);

    const active = false;

    const course = await showCourse.execute({
      course_id,
      active,
    });

    return response.json(classToClass(course));
  }
}
