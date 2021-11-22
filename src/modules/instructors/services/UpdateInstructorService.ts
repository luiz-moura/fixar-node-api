import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IInstructorsRepository from '../repositories/IInstructorsRepository';
import Instructor from '../infra/typeorm/entities/Instructor';

interface IRequest {
  instructor_id: string;
  name: string;
  about?: string;
  url?: string;
  linkedin?: string;
}

@injectable()
class UpdateInstructorService {
  constructor(
    @inject('InstructorsRepository')
    private instructorsRepository: IInstructorsRepository,
  ) {}

  public async execute({
    instructor_id,
    name,
    about,
    url,
    linkedin,
  }: IRequest): Promise<Instructor> {
    const instructor = await this.instructorsRepository.findById(instructor_id);

    if (!instructor) {
      throw new AppError('Instructor not found');
    }

    instructor.name = name;
    if (about) instructor.about = about;
    if (url) instructor.url = url;
    if (linkedin) instructor.linkedin = linkedin;

    return this.instructorsRepository.save(instructor);
  }
}

export default UpdateInstructorService;
