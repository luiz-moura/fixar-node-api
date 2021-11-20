import { injectable, inject } from 'tsyringe';

import Platform from '../infra/typeorm/entities/Platform';
import IPlatformsRepository from '../repositories/IPlatformsRepository';

@injectable()
class ListPlatformsService {
  constructor(
    @inject('PlatformsRepository')
    private platformsRepository: IPlatformsRepository,
  ) {}

  public async execute(): Promise<Platform[]> {
    const platforms = await this.platformsRepository.findAll();

    return platforms;
  }
}

export default ListPlatformsService;
