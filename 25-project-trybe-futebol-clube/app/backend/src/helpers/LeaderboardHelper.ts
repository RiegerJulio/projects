import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';

export default class LeaderboardHelper {
  // public static sortLeaderboard(data: ILeaderboard[]) {
  //   data.sort((a, b) => b.totalPoints - a.totalPoints
  //   || b.goalsBalance - a.goalsBalance
  //   || b.goalsFavor - a.goalsFavor
  //   || b.goalsOwn - a.goalsOwn);
  // }

  public static sortLeaderboard(data: ILeaderboard[]) {
    data.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      return 0;
    });
  }

  public static addWinHome = (data: ILeaderboard[], matchs: IMatch[]) => {
    data.forEach((team) => {
      const tm = team;
      matchs.forEach((match) => {
        if (match.teamHome.teamName === team.name && match.homeTeamGoals > match.awayTeamGoals) {
          tm.totalPoints += 3;
          tm.totalGames += 1;
          tm.totalVictories += 1;
          tm.goalsFavor += match.homeTeamGoals;
          tm.goalsOwn += match.awayTeamGoals;
          // talvez +=
          tm.goalsBalance = match.homeTeamGoals - match.awayTeamGoals;
          tm.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
        }
      });
    });
  };

  public static addWinAway = (data: ILeaderboard[], matchs: IMatch[]) => {
    data.forEach((team) => {
      const tm = team;
      matchs.forEach((match) => {
        if (match.teamAway.teamName === team.name && match.homeTeamGoals < match.awayTeamGoals) {
          tm.totalPoints += 3;
          tm.totalGames += 1;
          tm.totalVictories += 1;
          tm.goalsFavor += match.awayTeamGoals;
          tm.goalsOwn += match.homeTeamGoals;
          // talvez +=
          tm.goalsBalance = match.awayTeamGoals - match.homeTeamGoals;
          tm.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
        }
      });
    });
  };

  public static addDrawHome = (data: ILeaderboard[], matchs: IMatch[]) => {
    data.forEach((team) => {
      const tm = team;
      matchs.forEach((match) => {
        if (match.teamHome.teamName === team.name && match.homeTeamGoals === match.awayTeamGoals) {
          tm.totalPoints += 1;
          tm.totalGames += 1;
          tm.totalDraws += 1;
          tm.goalsFavor += match.homeTeamGoals;
          tm.goalsOwn += match.awayTeamGoals;
          tm.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
        }
      });
    });
  };

  public static addDrawAway = (data: ILeaderboard[], matchs: IMatch[]) => {
    data.forEach((team) => {
      const tm = team;
      matchs.forEach((match) => {
        if (match.teamAway.teamName === team.name && match.homeTeamGoals === match.awayTeamGoals) {
          tm.totalPoints += 1;
          tm.totalGames += 1;
          tm.totalDraws += 1;
          tm.goalsFavor += match.awayTeamGoals;
          tm.goalsOwn += match.homeTeamGoals;
          tm.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
        }
      });
    });
  };

  public static addLoseHome = (data: ILeaderboard[], matchs: IMatch[]) => {
    data.forEach((team) => {
      const tm = team;
      matchs.forEach((match) => {
        if (match.teamHome.teamName === team.name && match.homeTeamGoals < match.awayTeamGoals) {
          tm.totalGames += 1;
          tm.totalLosses += 1;
          tm.goalsFavor += match.homeTeamGoals;
          tm.goalsOwn += match.awayTeamGoals;
          tm.goalsBalance = match.homeTeamGoals - match.awayTeamGoals;
          tm.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
        }
      });
    });
  };

  public static addLoseAway = (data: ILeaderboard[], matchs: IMatch[]) => {
    data.forEach((team) => {
      const tm = team;
      matchs.forEach((match) => {
        if (match.teamAway.teamName === team.name && match.homeTeamGoals > match.awayTeamGoals) {
          tm.totalGames += 1;
          tm.totalLosses += 1;
          tm.goalsFavor += match.awayTeamGoals;
          tm.goalsOwn += match.homeTeamGoals;
          tm.goalsBalance = match.awayTeamGoals - match.homeTeamGoals;
          tm.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
        }
      });
    });
  };

  // public static leaderboardHome = (matchs: IMatch[]) => {
  //   let leaderboard = [] as ILeaderboard[];
  //   matchs.forEach((match) => {
  //     const teamHome = match.teamHome.teamName;
  //     const { homeTeamGoals, awayTeamGoals } = match;
  //     if ( homeTeamGoals > awayTeamGoals ) {
  //       leaderboard = this.addWinHome(leaderboard, matchs);}
  //     }
  //   }
}
