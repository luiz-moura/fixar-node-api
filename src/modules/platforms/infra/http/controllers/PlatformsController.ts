import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePlatformService from '@modules/platforms/services/CreatePlatformService';
import ListPlatformsService from '@modules/platforms/services/ListPlatformsService';

export default class PlatformsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPlatforms = container.resolve(ListPlatformsService);

    const platforms = await listPlatforms.execute();

    return response.json(platforms);
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

    return response.json(platform);
  }
}
