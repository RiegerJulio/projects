import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response): Promise<Response | void> {
    try {
      const leaderboard = await LeaderboardService.getLeaderboard();
      console.log(leaderboard);
      return res.status(200).json(leaderboard);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
