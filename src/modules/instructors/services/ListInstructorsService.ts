import { injectable, inject } from 'tsyringe';

import Instructor from '../infra/typeorm/entities/Instructor';
import IInstructorsRepository from '../repositories/IInstructorsRepository';

@injectable()
class ListInstructorsService {
  constructor(
    @inject('InstructorsRepository')
    private instructorsRepository: IInstructorsRepository,
  ) {}

  public async execute(): Promise<Instructor[]> {
    const instructors = await this.instructorsRepository.findAll();

    return instructors;
  }
}

export default ListInstructorsService;
