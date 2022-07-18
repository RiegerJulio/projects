import mongoose from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, mongoose.Document {}

const carSchema = new mongoose.Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

export default class CarModel extends MongoModel<Car> {
  constructor(model = mongoose.model('Cars', carSchema)) {
    super(model);
  }
}