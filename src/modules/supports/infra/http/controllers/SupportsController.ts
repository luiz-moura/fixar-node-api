import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSupportService from '@modules/supports/services/CreateSupportService';
import ListSupportsService from '@modules/supports/services/ListSupportsService';
import ShowSupportService from '@modules/supports/services/ShowSupportService';

export default class SupportsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSupports = container.resolve(ListSupportsService);

    const supports = await listSupports.execute();

    return response.json(classToClass(supports));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { support_id } = request.params;
    const showSupport = container.resolve(ShowSupportService);

    const support = await showSupport.execute({
      support_id,
    });

    return response.json(classToClass(support));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { subject, message, email } = request.body;

    const createSupportService = container.resolve(CreateSupportService);

    const support = await createSupportService.execute({
      subject,
      message,
      email,
    });

    return response.json(classToClass(support));
  }
}
