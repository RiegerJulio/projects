import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import IMatch from '../interfaces/IMatch';
import ICreateMatch from '../interfaces/ICreateMatch';
import IUpdateMatch from '../interfaces/IUpdateMatch';

export default class MatchService {
  public static async getAllMatches(): Promise<IMatch[]> {
    const matches = await MatchesModel.findAll({
      include: [{
        model: TeamsModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: TeamsModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches as unknown as IMatch[];
  }

  public static async getMatchesInProgress(inProgress: boolean): Promise<IMatch[]> {
    const matches = await MatchesModel.findAll({
      where: { inProgress },
      include: [{
        model: TeamsModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: TeamsModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches as unknown as IMatch[];
  }

  public static async createMatch(match: ICreateMatch): Promise<ICreateMatch> {
    const newMatch = await MatchesModel.create(match);
    return newMatch as ICreateMatch;
  }

  public static async updateMatch(match: IUpdateMatch): Promise<IUpdateMatch> {
    await MatchesModel.update(
      { homeTeamGoals: match.homeTeamGoals, awayTeamGoals: match.awayTeamGoals },
      { where: { id: match.id } },
    );

    return match as IUpdateMatch;
  }

  public static async endMatch(id: number) {
    const inProgress = false;
    await MatchesModel.update({ inProgress }, { where: { id } });

    return id;
  }

  public static async getMatchById(id: number): Promise<IMatch> {
    const match = await MatchesModel.findOne({
      where: { id },
      include: [{
        model: TeamsModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: TeamsModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return match as unknown as IMatch;
  }
}
