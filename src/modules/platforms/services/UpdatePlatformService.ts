import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPlatformsRepository from '../repositories/IPlatformsRepository';
import Platform from '../infra/typeorm/entities/Platform';

interface IRequest {
  platform_id: string;
  name: string;
  about?: string;
  type: string;
  url?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('PlatformsRepository')
    private platformsRepository: IPlatformsRepository,
  ) {}

  public async execute({
    platform_id,
    name,
    about,
    type,
    url,
  }: IRequest): Promise<Platform> {
    const platform = await this.platformsRepository.findById(platform_id);

    if (!platform) {
      throw new AppError('Platform not found');
    }

    const platformWithUpdatedName = await this.platformsRepository.findByName(
      name,
    );

    if (platformWithUpdatedName && platformWithUpdatedName.id !== platform_id) {
      throw new AppError('E-mail already in use.');
    }

    platform.name = name;
    if (about) platform.about = about;
    platform.type = type;
    if (url) platform.url = url;

    return this.platformsRepository.save(platform);
  }
}

export default UpdateProfileService;
