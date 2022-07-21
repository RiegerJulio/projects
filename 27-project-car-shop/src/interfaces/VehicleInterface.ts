import { z } from 'zod';

export const vehicleSchema = z.object({
  model: z.string({
    required_error: 'Vehicle must have model',
    invalid_type_error: 'Vehicle model must be a string',
  }).min(3, { message: 'Vehicle model must be at least 3 characters' }),

  year: z.number({
    required_error: 'Vehicle must have year',
    invalid_type_error: 'Vehicle year must be a number',
  }).gte(1900, { message: 'Vehicle year must be greater than or equal 1900' })
    .lte(2022, { message: 'Vehicle year must be less than or equal 2020' }),

  color: z.string({
    required_error: 'Vehicle must have color',
    invalid_type_error: 'Vehicle color must be a string',
  }).min(3, { message: 'Vehicle color must be at least 3 characters' }),

  status: z.boolean({
    invalid_type_error: 'Vehicle status must be a boolean',
  }).optional(),

  buyValue: z.number({
    required_error: 'Vehicle must have buyValue',
    invalid_type_error: 'Vehicle buyValue must be a number',
  }).int({ message: 'Vehicle buyValue must be an integer' }),

});

export type Vehicle = z.infer<typeof vehicleSchema>;
