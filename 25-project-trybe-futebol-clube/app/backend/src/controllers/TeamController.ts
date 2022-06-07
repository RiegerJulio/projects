import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  static async getTeamById(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const team = await TeamService.getTeamById(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      return res.status(404).json({ message: 'There\'s no team with that id' });
    }
  }

  static async getAllTeams(_req: Request, res: Response): Promise<Response | void> {
    try {
      const teams = await TeamService.getAllTeams();
      return res.status(200).json(teams);
    } catch (error) {
      return res.status(404).json({ message: 'There\'s an error getting all teams' });
    }
  }
}
