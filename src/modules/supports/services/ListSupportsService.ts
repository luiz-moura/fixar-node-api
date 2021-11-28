import { injectable, inject } from 'tsyringe';

import Support from '../infra/typeorm/entities/Support';
import ISupportsRepository from '../repositories/ISupportsRepository';

@injectable()
class ListSupportsService {
  constructor(
    @inject('SupportsRepository')
    private supportsRepository: ISupportsRepository,
  ) {}

  public async execute(): Promise<Support[]> {
    const supports = await this.supportsRepository.findAll();

    return supports;
  }
}

export default ListSupportsService;
