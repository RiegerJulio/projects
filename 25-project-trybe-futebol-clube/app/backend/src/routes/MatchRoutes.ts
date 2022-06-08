import * as express from 'express';
import MatchController from '../controllers/MatchController';
import MatchMiddleware from '../middlewares/MatchMiddleware';

export default class MatchRoutes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.get(
      '/',
      MatchController.getAllMatches,
    );
    this.router.post(
      '/',
      MatchMiddleware.matchValidate,
      MatchController.createMatch,
    );
    this.router.patch(
      '/:id',
      MatchController.updateMatch,
    );
    this.router.patch(
      '/:id/finish',
      MatchController.endMatch,
    );
  }
}
