import { getRepository, Repository } from 'typeorm';

import ISupportRepository from '@modules/supports/repositories/ISupportsRepository';
import ICreateSupportDTO from '@modules/supports/dtos/ICreateSupportDTO';

import Support from '../entities/Support';

class SupportRepository implements ISupportRepository {
  private ormRepository: Repository<Support>;

  constructor() {
    this.ormRepository = getRepository(Support);
  }

  public async findAll(): Promise<Support[]> {
    const supports = await this.ormRepository.find();

    return supports;
  }

  public async findById(id: string): Promise<Support | undefined> {
    const support = await this.ormRepository.findOne(id);

    return support;
  }

  public async create({
    subject,
    message,
    email,
  }: ICreateSupportDTO): Promise<Support> {
    const support = this.ormRepository.create({ subject, message, email });

    await this.ormRepository.save(support);

    return support;
  }

  public async save(support: Support): Promise<Support> {
    return this.ormRepository.save(support);
  }
}

export default SupportRepository;
