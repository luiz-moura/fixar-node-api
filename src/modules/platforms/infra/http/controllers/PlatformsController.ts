import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePlatformService from '@modules/platforms/services/CreatePlatformService';
import ListPlatformsService from '@modules/platforms/services/ListPlatformsService';
import UpdatePlatformService from '@modules/platforms/services/UpdatePlatformService';
import ShowPlatformService from '@modules/platforms/services/ShowPlatformService';

export default class PlatformsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPlatforms = container.resolve(ListPlatformsService);

    const platforms = await listPlatforms.execute();

    return response.json(classToClass(platforms));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { platform_id } = request.params;
    const showPlatform = container.resolve(ShowPlatformService);

    const platform = await showPlatform.execute({
      platform_id,
    });

    return response.json(classToClass(platform));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, about, type, url } = request.body;

    const createPlatformService = container.resolve(CreatePlatformService);

    const platform = await createPlatformService.execute({
      name,
      about,
      type,
      url,
    });

    return response.json(classToClass(platform));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { platform_id } = request.params;
    const { name, about, type, url } = request.body;

    const updatePlatform = container.resolve(UpdatePlatformService);

    const platform = await updatePlatform.execute({
      platform_id,
      name,
      about,
      type,
      url,
    });

    return response.json(classToClass(platform));
  }
}
