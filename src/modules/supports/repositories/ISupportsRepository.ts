import Support from '../infra/typeorm/entities/Support';
import ICreateSupportDTO from '../dtos/ICreateSupportDTO';

export default interface ISupportsRepository {
  create(data: ICreateSupportDTO): Promise<Support>;
  findById(id: string): Promise<Support | undefined>;
  findAll(): Promise<Support[]>;
}
