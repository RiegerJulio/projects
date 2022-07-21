import mongoose from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

interface MotorcycleDocument extends Motorcycle, mongoose.Document {}

const motorcycleSchema = new mongoose.Schema<MotorcycleDocument>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = mongoose.model('Motorcycles', motorcycleSchema)) {
    super(model);
  }
}