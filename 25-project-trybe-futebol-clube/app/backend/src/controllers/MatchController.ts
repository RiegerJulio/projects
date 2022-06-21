import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAllMatches(req: Request, res: Response): Promise<Response | void> {
    try {
      const { inProgress } = req.query;
      if (!inProgress) {
        const matches = await MatchService.getAllMatches();
        return res.status(200).json(matches);
      }
      const trueParam = inProgress === 'true';
      const matches = await MatchService.getMatchesInProgress(trueParam);
      return res.status(200).json(matches);
    } catch (error) {
      return res.status(500).json({ message: 'Internals server error' });
    }
  }

  static async createMatch(req: Request, res: Response): Promise<Response | void> {
    try {
      const match = await MatchService.createMatch(req.body);
      if (!match) {
        return res.status(401).json({ message: 'Incorrect of invalid matchs' });
      }
      return res.status(201).json(match);
    } catch (error) {
      return res.status(500).json({ message: 'Internals server error' });
    }
  }

  static async updateMatch(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const matchId = await MatchService.getMatchById(Number(id));
      if (!matchId) {
        return res.status(401).json({ message: 'There is no match with that id' });
      }
      if (matchId.inProgress === false) {
        return res.status(401).json({ message: 'You cant change score if the game already end' });
      }
      const match = await MatchService.updateMatch({ id, homeTeamGoals, awayTeamGoals });
      return res.status(200).json(match);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async endMatch(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const matchId = await MatchService.getMatchById(Number(id));
      if (!matchId) {
        return res.status(401).json({ message: 'There is no match with that id' });
      }
      if (matchId.inProgress === false) {
        return res.status(401).json({ message: 'The match is already finished' });
      }
      await MatchService.endMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
