import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Instructor from '../infra/typeorm/entities/Instructor';
import IInstructorsRepository from '../repositories/IInstructorsRepository';

interface IRequest {
  name: string;
  about?: string;
  url?: string;
  linkedin?: string;
}

@injectable()
class CreateInstructorService {
  constructor(
    @inject('InstructorsRepository')
    private instructorsRepository: IInstructorsRepository,
  ) {}

  public async execute({
    name,
    about,
    url,
    linkedin,
  }: IRequest): Promise<Instructor> {
    const findInstructor = await this.instructorsRepository.findByName(name);

    if (findInstructor) {
      throw new AppError('This instructor alredy exists');
    }

    const instructor = await this.instructorsRepository.create({
      name,
      about,
      url,
      linkedin,
    });

    return instructor;
  }
}

export default CreateInstructorService;
