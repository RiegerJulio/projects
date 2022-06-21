import IMatch from '../interfaces/IMatch';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardHelper {
  public static sortLeaderboard(data: ILeaderboard[]) {
    data.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return data;
  }

  public static addTotalPoints(data: IMatch[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      return data.reduce((acc, curr) => {
        if (curr.homeTeamGoals > curr.awayTeamGoals) {
          return acc + 3;
        } if (curr.homeTeamGoals === curr.awayTeamGoals) {
          return acc + 1;
        } return acc;
      }, 0);
    }
    return data.reduce((acc, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) {
        return acc + 3;
      } if (curr.homeTeamGoals === curr.awayTeamGoals) {
        return acc + 1;
      } return acc;
    }, 0);
  }

  public static addTotalGames(data: IMatch[]) {
    return data.length;
  }

  public static addTotalVictories(data: IMatch[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      return data.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    } return data.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  }

  public static addTotalDraws(data: IMatch[]) {
    return data.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  public static addTotalLosses(data: IMatch[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      return data.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    } return data.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }

  public static addGoalsFavor(data: IMatch[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      return data.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    } return data.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  }

  public static addGoalsOwn(data: IMatch[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      return data.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    } return data.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  }

  public static addGoalsBalance(data: IMatch[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      return LeaderboardHelper.addGoalsFavor(data, 'home')
      - LeaderboardHelper.addGoalsOwn(data, 'home');
    } return LeaderboardHelper.addGoalsFavor(data, 'away')
    - LeaderboardHelper.addGoalsOwn(data, 'away');
  }

  public static addEfficiency(data: IMatch[], homeOrAway: string) {
    if (homeOrAway === 'home') {
      const totalPoints = LeaderboardHelper.addTotalPoints(data, 'home');
      const totalGames = LeaderboardHelper.addTotalGames(data);
      return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    }
    const totalPoints = LeaderboardHelper.addTotalPoints(data, 'away');
    const totalGames = LeaderboardHelper.addTotalGames(data);
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  public static addLeaderboardHome(data: IMatch[]) {
    return {
      totalPoints: LeaderboardHelper.addTotalPoints(data, 'home'),
      totalGames: LeaderboardHelper.addTotalGames(data),
      totalVictories: LeaderboardHelper.addTotalVictories(data, 'home'),
      totalDraws: LeaderboardHelper.addTotalDraws(data),
      totalLosses: LeaderboardHelper.addTotalLosses(data, 'home'),
      goalsFavor: LeaderboardHelper.addGoalsFavor(data, 'home'),
      goalsOwn: LeaderboardHelper.addGoalsOwn(data, 'home'),
      goalsBalance: LeaderboardHelper.addGoalsBalance(data, 'home'),
      efficiency: LeaderboardHelper.addEfficiency(data, 'home'),
    };
  }

  public static addLeaderboardAway(data: IMatch[]) {
    return {
      totalPoints: LeaderboardHelper.addTotalPoints(data, 'away'),
      totalGames: LeaderboardHelper.addTotalGames(data),
      totalVictories: LeaderboardHelper.addTotalVictories(data, 'away'),
      totalDraws: LeaderboardHelper.addTotalDraws(data),
      totalLosses: LeaderboardHelper.addTotalLosses(data, 'away'),
      goalsFavor: LeaderboardHelper.addGoalsFavor(data, 'away'),
      goalsOwn: LeaderboardHelper.addGoalsOwn(data, 'away'),
      goalsBalance: LeaderboardHelper.addGoalsBalance(data, 'away'),
      efficiency: LeaderboardHelper.addEfficiency(data, 'away'),
    };
  }

  public static addLeaderboard(homeData: ILeaderboard, awayData: ILeaderboard) {
    return {
      totalPoints: homeData.totalPoints + awayData.totalPoints,
      totalGames: homeData.totalGames + awayData.totalGames,
      totalVictories: homeData.totalVictories + awayData.totalVictories,
      totalDraws: homeData.totalDraws + awayData.totalDraws,
      totalLosses: homeData.totalLosses + awayData.totalLosses,
      goalsFavor: homeData.goalsFavor + awayData.goalsFavor,
      goalsOwn: homeData.goalsOwn + awayData.goalsOwn,
      goalsBalance: homeData.goalsBalance + awayData.goalsBalance,
      efficiency: Number((((homeData.totalPoints + awayData.totalPoints)
        / ((homeData.totalGames + awayData.totalGames) * 3)) * 100).toFixed(2)),
    };
  }

  public static createFilterId(data: IMatch[], homeOrAway: string, id: number) {
    if (homeOrAway === 'home') {
      return data.filter((match) => match.homeTeam === id);
    } return data.filter((match) => match.awayTeam === id);
  }
}
