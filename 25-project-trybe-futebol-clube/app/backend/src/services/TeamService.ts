import TeamsModel from '../database/models/TeamsModel';
import ITeam from '../interfaces/ITeam';

export default class TeamService {
  static async getTeamById(id: number): Promise<ITeam> {
    const team = await TeamsModel.findByPk(id);
    return team as ITeam;
  }

  static async getAllTeams(): Promise<ITeam[]> {
    const teams = await TeamsModel.findAll();
    return teams as ITeam[];
  }
}
