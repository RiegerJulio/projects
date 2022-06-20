import * as express from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

export default class LeaderboardRoutes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.get('/', LeaderboardController.getLeaderboard);
    this.router.get('/home', LeaderboardController.getLeaderboard);
    this.router.get('/away', LeaderboardController.getLeaderboard);
  }
}
