import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPlatformsRepository from '../repositories/IPlatformsRepository';

import Platform from '../infra/typeorm/entities/Platform';

interface IRequest {
  platform_id: string;
}

@injectable()
class ShowPlatformService {
  constructor(
    @inject('PlatformsRepository')
    private platformsRepository: IPlatformsRepository,
  ) {}

  public async execute({ platform_id }: IRequest): Promise<Platform> {
    const platform = await this.platformsRepository.findById(platform_id);

    if (!platform) {
      throw new AppError('Platform not found');
    }

    return platform;
  }
}

export default ShowPlatformService;
