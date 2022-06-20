import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import LeaderboardHelper from '../helpers/LeaderboardHelper';

export default class LeaderboardService {
  public static async getMatchData(id: number, name: string) {
    const allMatches = await MatchesModel.findAll({
      where: { homeTeam: id, inProgress: false },
    });

    const goalsData = LeaderboardHelper.goalsData(allMatches);
    const matchData = LeaderboardHelper.matchData(allMatches);
    const totalGames = allMatches.length;
    const efficiency = Number(((matchData.totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const matchFormat = {
      name,
      ...matchData,
      ...goalsData,
      goalsBalance: goalsData.goalsFavor - goalsData.goalsOwn,
      efficiency,
      totalGames,
    };

    return matchFormat;
  }

  public static async getLeaderboard(): Promise<ILeaderboard[]> {
    const allTeams = await TeamsModel.findAll();
    const teamsMap = await Promise.all(allTeams.map((teams) =>
      LeaderboardService.getMatchData(teams.id, teams.teamName)));
    const sortTeams = LeaderboardHelper.sortLeaderboard(teamsMap);

    return sortTeams;
  }
}
