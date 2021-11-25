import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateInstructorService from '@modules/instructors/services/CreateInstructorService';
import ListInstructorsService from '@modules/instructors/services/ListInstructorsService';
import UpdateInstructorService from '@modules/instructors/services/UpdateInstructorService';

export default class InstructorsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listInstructors = container.resolve(ListInstructorsService);

    const instructors = await listInstructors.execute();

    return response.json(classToClass(instructors));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, about, url, linkedin } = request.body;

    const createInstructorService = container.resolve(CreateInstructorService);

    const instructor = await createInstructorService.execute({
      name,
      about,
      url,
      linkedin,
    });

    return response.json(classToClass(instructor));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { instructor_id } = request.params;
    const { name, about, url, linkedin } = request.body;

    const updateInstructor = container.resolve(UpdateInstructorService);

    const instructor = await updateInstructor.execute({
      instructor_id,
      name,
      about,
      url,
      linkedin,
    });

    return response.json(classToClass(instructor));
  }
}
