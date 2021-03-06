import * as express from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

export default class LeaderboardRoutes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.get('/', LeaderboardController.getAll);
    this.router.get('/home', LeaderboardController.getAllHome);
    this.router.get('/away', LeaderboardController.getAllAway);
  }
}
