import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResoponseError } from './MongoController';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarService';

export default class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route(): string {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResoponseError>,
  ): Promise<typeof res> => {
    try {
      const data = await this.service.create(req.body);
      if (!data) {
        return res.status(400).json({ error: this.errors.internal });
      }
      if ('error' in data) {
        return res.status(400).json(data);
      }
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResoponseError>,
  ): Promise<typeof res> => {
    try {
      if (req.params.id.length !== 24) {
        return res.status(400).json({ error: this.errors.idWithProblems });
      }
      const data = await this.service.readOne(req.params.id);
      if (!data) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResoponseError>,
  ): Promise<typeof res> => {
    try {
      if (req.params.id.length !== 24) {
        return res.status(400).json({ error: this.errors.idWithProblems });
      }
      const data = await this.service.update(req.params.id, req.body);
      if (!data) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in data) {
        return res.status(400).json(data);
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResoponseError>,
  ): Promise<typeof res> => {
    try {
      if (req.params.id.length !== 24) {
        return res.status(400).json({ error: this.errors.idWithProblems });
      }
      const data = await this.service.delete(req.params.id);
      if (!data) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(204).json(data);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}