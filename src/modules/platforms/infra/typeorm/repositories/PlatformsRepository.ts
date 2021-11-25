import { getRepository, Repository } from 'typeorm';

import IPlatformRepository from '@modules/platforms/repositories/IPlatformsRepository';
import ICreatePlatformDTO from '@modules/platforms/dtos/ICreatePlatformDTO';

import Platform from '../entities/Platform';

class PlatformRepository implements IPlatformRepository {
  private ormRepository: Repository<Platform>;

  constructor() {
    this.ormRepository = getRepository(Platform);
  }

  public async findAll(): Promise<Platform[]> {
    const platforms = await this.ormRepository.find({
      relations: ['courses'],
    });

    return platforms;
  }

  public async findById(id: string): Promise<Platform | undefined> {
    const platform = await this.ormRepository.findOne(id, {
      relations: ['courses'],
    });

    return platform;
  }

  public async findByName(name: string): Promise<Platform | undefined> {
    const findPlatform = await this.ormRepository.findOne({
      where: { name },
    });

    return findPlatform;
  }

  public async create({
    name,
    about,
    type,
    url,
  }: ICreatePlatformDTO): Promise<Platform> {
    const platform = this.ormRepository.create({ name, about, type, url });

    await this.ormRepository.save(platform);

    return platform;
  }

  public async save(platform: Platform): Promise<Platform> {
    return this.ormRepository.save(platform);
  }
}

export default PlatformRepository;
