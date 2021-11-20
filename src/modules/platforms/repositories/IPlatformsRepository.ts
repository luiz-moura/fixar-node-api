import Platform from '../infra/typeorm/entities/Platform';
import ICreatePlatformDTO from '../dtos/ICreatePlatformDTO';

export default interface IPlatformsRepository {
  create(data: ICreatePlatformDTO): Promise<Platform>;
  save(user: Platform): Promise<Platform>;
  findById(id: string): Promise<Platform | undefined>;
  findAll(): Promise<Platform[]>;
  findByName(name: string): Promise<Platform | undefined>;
}
