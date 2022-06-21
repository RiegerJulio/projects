import LeaderboardHelper from '../helpers/LeaderboardHelper';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import ITeam from '../interfaces/ITeam';

export default class LeaderboardService {
  public static async getHomeData() {
    const allMatches = await MatchesModel.findAll({ where: { inProgress: false } });
    const allTeams = await TeamsModel.findAll();
    const teamsMap = allTeams.map((teams: ITeam) => {
      const homeOrAwayFilter = LeaderboardHelper.createFilterId(allMatches, 'home', teams.id);
      const homeData = LeaderboardHelper.addLeaderboardHome(homeOrAwayFilter);
      return { name: teams.teamName, ...homeData };
    });
    return LeaderboardHelper.sortLeaderboard(teamsMap);
  }

  public static async getAwayData() {
    const allMatches = await MatchesModel.findAll({ where: { inProgress: false } });
    const allTeams = await TeamsModel.findAll();
    const teamsMap = allTeams.map((teams: ITeam) => {
      const homeOrAwayFilter = LeaderboardHelper.createFilterId(allMatches, 'away', teams.id);
      const awayData = LeaderboardHelper.addLeaderboardAway(homeOrAwayFilter);
      return { name: teams.teamName, ...awayData };
    });
    return LeaderboardHelper.sortLeaderboard(teamsMap);
  }

  public static async getAllData() {
    const allMatches = await MatchesModel.findAll({ where: { inProgress: false } });
    const allTeams = await TeamsModel.findAll();
    const teamsMap = allTeams.map((teams: ITeam) => {
      const homeFilter = LeaderboardHelper.createFilterId(allMatches, 'home', teams.id);
      const awayFilter = LeaderboardHelper.createFilterId(allMatches, 'away', teams.id);
      const homeData = LeaderboardHelper.addLeaderboardHome(homeFilter);
      const awayData = LeaderboardHelper.addLeaderboardAway(awayFilter);
      const allData = LeaderboardHelper.addLeaderboard(homeData, awayData);
      return { name: teams.teamName, ...allData };
    });
    return LeaderboardHelper.sortLeaderboard(teamsMap);
  }
}
