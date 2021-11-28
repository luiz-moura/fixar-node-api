import { injectable, inject } from 'tsyringe';

import Support from '../infra/typeorm/entities/Support';
import ISupportsRepository from '../repositories/ISupportsRepository';

interface IRequest {
  subject: string;
  message: string;
  email: string;
}

@injectable()
class CreateSupportService {
  constructor(
    @inject('SupportsRepository')
    private supportsRepository: ISupportsRepository,
  ) {}

  public async execute({
    subject,
    message,
    email,
  }: IRequest): Promise<Support> {
    const support = await this.supportsRepository.create({
      subject,
      message,
      email,
    });

    return support;
  }
}

export default CreateSupportService;
