import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

export default class MatchMiddleware {
  static async matchValidate(req: Request, res: Response, next: NextFunction):
  Promise <Response | void> {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(404).json({ message: 'Home and away team cannot be the same' });
    }
    const getTeamById = await TeamService.getTeamById(homeTeam || awayTeam);
    if (!getTeamById) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }
}
