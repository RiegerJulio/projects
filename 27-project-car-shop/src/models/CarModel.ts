import mongoose from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, mongoose.Document {}

const carSchema = new mongoose.Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class CarModel extends MongoModel<Car> {
  constructor(model = mongoose.model('Cars', carSchema)) {
    super(model);
  }
}

// Version Key REF https://stackoverflow.com/questions/13699784/mongoose-v-property-hide