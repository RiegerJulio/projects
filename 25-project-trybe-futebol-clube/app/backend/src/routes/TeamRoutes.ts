import * as express from 'express';
import TeamController from '../controllers/TeamController';

export default class TeamRoutes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.get(
      '/',
      TeamController.getAllTeams,
    );
    this.router.get(
      '/:id',
      TeamController.getTeamById,
    );
  }
}
