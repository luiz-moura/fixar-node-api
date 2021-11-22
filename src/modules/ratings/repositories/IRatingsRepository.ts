import Rating from '../infra/typeorm/entities/Rating';
import ICreateRatingDTO from '../dtos/ICreateRatingDTO';

export default interface IRatingsRepository {
  create(data: ICreateRatingDTO): Promise<Rating>;
  save(user: Rating): Promise<Rating>;
  findById(id: string): Promise<Rating | undefined>;
  find(params: object): Promise<Rating | undefined>;
  findAll(): Promise<Rating[]>;
}
