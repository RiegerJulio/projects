import { Motorcycle, MotorcycleSchema }
  from '../interfaces/MotorcycleInterface';

import Service, { ServiceError } from './MongoService';
import MotorcycleModel from '../models/MotorcycleModel';
import { vehicleSchema } from '../interfaces/VehicleInterface';

export default class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  public async create(data: Motorcycle):
  Promise<Motorcycle | null | ServiceError> {
    const parsed = MotorcycleSchema.safeParse(data);
    const vehicleParsed = vehicleSchema.safeParse(data);
    if (!vehicleParsed.success) {
      return { error: vehicleParsed.error };
    }
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(data);
  }

  async update(id: string, data: Motorcycle):
  Promise<Motorcycle | null | ServiceError> {
    const parsed = MotorcycleSchema.safeParse(data);
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