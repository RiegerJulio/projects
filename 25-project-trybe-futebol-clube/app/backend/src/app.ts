import * as express from 'express';
import LoginRoutes from './routes/LoginRoutes';
import TeamRoutes from './routes/TeamRoutes';
import MatchRoutes from './routes/MatchRoutes';
import LeaderboardRoutes from './routes/LeaderboardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.use(express.json());
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  private routes(): void {
    const login = new LoginRoutes();
    const team = new TeamRoutes();
    const match = new MatchRoutes();
    const leaderboard = new LeaderboardRoutes();
    this.app.use('/login', login.router);
    this.app.use('/teams', team.router);
    this.app.use('/matches', match.router);
    this.app.use('/leaderboard', leaderboard.router);
  }
}

export { App };

export const { app } = new App();
