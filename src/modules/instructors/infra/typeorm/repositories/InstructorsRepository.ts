import { getRepository, Repository } from 'typeorm';

import IInstructorRepository from '@modules/instructors/repositories/IInstructorsRepository';
import ICreateInstructorDTO from '@modules/instructors/dtos/ICreateInstructorDTO';

import Instructor from '../entities/Instructor';

class InstructorRepository implements IInstructorRepository {
  private ormRepository: Repository<Instructor>;

  constructor() {
    this.ormRepository = getRepository(Instructor);
  }

  public async findAll(): Promise<Instructor[]> {
    const instructors = await this.ormRepository.find();

    return instructors;
  }

  public async findById(id: string): Promise<Instructor | undefined> {
    const instructor = await this.ormRepository.findOne(id);

    return instructor;
  }

  public async findByName(name: string): Promise<Instructor | undefined> {
    const findInstructor = await this.ormRepository.findOne({
      where: { name },
    });

    return findInstructor;
  }

  public async create({
    name,
    about,
    url,
    linkedin,
  }: ICreateInstructorDTO): Promise<Instructor> {
    const instructor = this.ormRepository.create({
      name,
      about,
      url,
      linkedin,
    });

    await this.ormRepository.save(instructor);

    return instructor;
  }

  public async save(instructor: Instructor): Promise<Instructor> {
    return this.ormRepository.save(instructor);
  }
}

export default InstructorRepository;
