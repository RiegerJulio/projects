import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export const carSchema = z.object({
  doorsQty:
  z.number({
    required_error: 'Car must have doorsQty',
    invalid_type_error: 'Car doorsQty must be a number',
  })
    .gte(2, { message: 'Car doorsQty must be greater than or equal 2' })
    .lte(4, { message: 'Car doorsQty must be less than or equal 4' }),

  seatsQty:
  z.number({
    required_error: 'Car must have seatsQty',
    invalid_type_error: 'Car seatsQty must be a number',
  })
    .gte(2, { message: 'Car seatsQty must be greater than or equal 2' })
    .lte(7, { message: 'Car seatsQty must be less than or equal 7' }),
});

type CarType = z.infer<typeof carSchema>;

export interface Car extends CarType, Vehicle {}