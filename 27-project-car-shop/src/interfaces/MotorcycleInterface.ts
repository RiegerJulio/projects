import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export const MotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'Motorcycle must have engineCapacity',
    invalid_type_error: 'Motorcycle engineCapacity must be a number',
  }).int({ message: 'Motorcycle engineCapacity must be an integer' })
    .positive({ message: 'Motorcycle engineCapacity must be positive' })
    .lte(
      2500,
      { message: 'Motorcycle engineCapacity must be less than or equal 2500' },
    ),
});

type MotorcycleType = z.infer<typeof MotorcycleSchema>;

export interface Motorcycle extends MotorcycleType, Vehicle {}