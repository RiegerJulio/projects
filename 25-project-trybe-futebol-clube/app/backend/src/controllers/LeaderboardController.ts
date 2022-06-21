import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

const ERROR = 'internal server error';

export default class LeaderboardController {
  public static async getAllHome(req: Request, res: Response) {
    try {
      const leaderboard = await LeaderboardService.getHomeData();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: ERROR });
    }
  }

  public static async getAllAway(req: Request, res: Response) {
    try {
      const leaderboard = await LeaderboardService.getAwayData();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: ERROR });
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const leaderboard = await LeaderboardService.getAllData();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: ERROR });
    }
  }
}
