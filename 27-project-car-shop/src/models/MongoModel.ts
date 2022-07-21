import mongoose from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class MongoModel<T> implements Model<T> {
  constructor(public model: mongoose.Model<T & mongoose.Document>) {}

  public async create(data: T): Promise<T> {
    return this.model.create(data);
  }

  public async read(): Promise<T[]> {
    return this.model.find();
  }

  public async readOne(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id });
  }

  public async update(id: string, data: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}