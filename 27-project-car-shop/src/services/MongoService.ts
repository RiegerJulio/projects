import zod from 'zod';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: zod.ZodError;
}

export default abstract class Service<T> {
  constructor(public model: Model<T>) {}

  public async create(data: T): Promise<T | null | ServiceError> {
    return this.model.create(data);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  public async update(id: string, data: T): Promise<T | null | ServiceError> {
    return this.model.update(id, data);
  }

  public async delete(id: string): Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }
}
