import { Car, carSchema } from '../interfaces/CarInterface';
import Service, { ServiceError } from './MongoService';
import CarModel from '../models/CarModel';
import { vehicleSchema } from '../interfaces/VehicleInterface';

export default class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  public async create(data: Car): Promise<Car | null | ServiceError> {
    const parsed = carSchema.safeParse(data);
    const vehicleParsed = vehicleSchema.safeParse(data);
    if (!vehicleParsed.success) {
      return { error: vehicleParsed.error };
    }
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(data);
  }

  async update(id: string, data: Car): Promise<Car | null | ServiceError> {
    const parsed = carSchema.safeParse(data);
    const vehicleParsed = vehicleSchema.safeParse(data);
    if (!vehicleParsed.success) {
      return { error: vehicleParsed.error };
    }
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, data);
  }
}
