import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Platform from '../infra/typeorm/entities/Platform';
import IPlatformsRepository from '../repositories/IPlatformsRepository';

interface IRequest {
  name: string;
  about: string;
  type: string;
  url: string;
}

@injectable()
class CreatePlatformService {
  constructor(
    @inject('PlatformsRepository')
    private platformsRepository: IPlatformsRepository,
  ) {}

  public async execute({
    name,
    about,
    type,
    url,
  }: IRequest): Promise<Platform> {
    const findPlatform = await this.platformsRepository.findByName(name);

    if (findPlatform) {
      throw new AppError('This platform alredy exists');
    }

    const platform = await this.platformsRepository.create({
      name,
      about,
      type,
      url,
    });

    return platform;
  }
}

export default CreatePlatformService;
