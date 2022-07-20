import { Request, Response } from 'express';
import Service from '../services/MongoService';

export type ResoponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal server error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
  idWithProblems = 'Id must have 24 hexadecimal characters',
}

export default abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(public service: Service<T>) {}

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResoponseError>
  ): Promise<typeof res>;

  read = async (
    req: Request,
    res: Response<T[] | ResoponseError>,
  ): Promise<typeof res> => {
    try {
      const data = await this.service.read();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResoponseError>,
  ): Promise<typeof res>;

  abstract update(
    req: Request<{ id: string }>,
    res: Response<T | ResoponseError>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string }>,
    res: Response<T | ResoponseError>,
  ): Promise<typeof res>;
}