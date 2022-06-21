import ITeam from '../interfaces/ITeam';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';
import LeaderboardHelper from '../helpers/LeaderboardHelper';

export default class LeaderboardService {
  public static leaderboardTeams(teams: ITeam[]) {
    const leaderboard: ILeaderboard[] = [];
    teams.forEach((team) => {
      leaderboard.push({
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      });
    });
    return leaderboard;
  }

  public static getAllHome = async () => {
    const matches = await MatchesModel.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'teamHome' }],
    }) as unknown as IMatch[];
    const teams = await TeamsModel.findAll();
    const leaderboard = this.leaderboardTeams(teams);
    LeaderboardHelper.addWinHome(this.leaderboardTeams(teams), matches);
    LeaderboardHelper.addDrawHome(this.leaderboardTeams(teams), matches);
    LeaderboardHelper.addLoseHome(this.leaderboardTeams(teams), matches);
    return LeaderboardHelper.sortLeaderboard(leaderboard);
  };

  public static getAllAway = async () => {
    const matches = await MatchesModel.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'teamAway' }],
    }) as unknown as IMatch[];
    const teams = await TeamsModel.findAll();
    const leaderboard = this.leaderboardTeams(teams);
    LeaderboardHelper.addWinAway(this.leaderboardTeams(teams), matches);
    LeaderboardHelper.addDrawAway(this.leaderboardTeams(teams), matches);
    LeaderboardHelper.addLoseAway(this.leaderboardTeams(teams), matches);
    return LeaderboardHelper.sortLeaderboard(leaderboard);
  };

  public static getAll = async () => {
    const matches = await MatchesModel.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'teamHome' }, { model: TeamsModel, as: 'teamAway' }],
    }) as unknown as IMatch[];
    const teams = await TeamsModel.findAll();
    const leaderboard = this.leaderboardTeams(teams);
    LeaderboardHelper.addWinHome(this.leaderboardTeams(teams), matches);
    LeaderboardHelper.addWinAway(this.leaderboardTeams(teams), matches);
    LeaderboardHelper.addDrawHome(this.leaderboardTeams(teams), matches);
    LeaderboardHelper.addDrawAway(this.leaderboardTeams(teams), matches);
    LeaderboardHelper.addLoseHome(this.leaderboardTeams(teams), matches);
    LeaderboardHelper.addLoseAway(this.leaderboardTeams(teams), matches);
    return LeaderboardHelper.sortLeaderboard(leaderboard);
  };
}
