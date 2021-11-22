import Instructor from '../infra/typeorm/entities/Instructor';
import ICreateInstructorDTO from '../dtos/ICreateInstructorDTO';

export default interface IInstructorsRepository {
  create(data: ICreateInstructorDTO): Promise<Instructor>;
  save(user: Instructor): Promise<Instructor>;
  findById(id: string): Promise<Instructor | undefined>;
  findAll(): Promise<Instructor[]>;
  findByName(name: string): Promise<Instructor | undefined>;
}
