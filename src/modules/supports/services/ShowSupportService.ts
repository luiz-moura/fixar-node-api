import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISupportsRepository from '../repositories/ISupportsRepository';

import Support from '../infra/typeorm/entities/Support';

interface IRequest {
  support_id: string;
}

@injectable()
class ShowSupportService {
  constructor(
    @inject('SupportsRepository')
    private supportsRepository: ISupportsRepository,
  ) {}

  public async execute({ support_id }: IRequest): Promise<Support> {
    const support = await this.supportsRepository.findById(support_id);

    if (!support) {
      throw new AppError('Support not found');
    }

    return support;
  }
}

export default ShowSupportService;
