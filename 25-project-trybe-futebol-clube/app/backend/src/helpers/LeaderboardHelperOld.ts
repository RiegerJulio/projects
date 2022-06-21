// import ILeaderboard from '../interfaces/ILeaderboard';
// import MatchesModel from '../database/models/MatchesModel';

// export default class LeaderboardHelper {
//   public static goalsData(data: MatchesModel[]) {
//     let goalsFavor = 0;
//     let goalsOwn = 0;

//     data.forEach((match) => {
//       goalsFavor += match.homeTeamGoals;
//       goalsOwn += match.awayTeamGoals;
//     });

//     return { goalsFavor, goalsOwn };
//   }

//   public static matchData(data: MatchesModel[]) {
//     let totalPoints = 0;
//     let totalVictories = 0;
//     let totalDraws = 0;
//     let totalLosses = 0;

//     data.forEach((match) => {
//       if (match.homeTeamGoals > match.awayTeamGoals) {
//         totalPoints += 3;
//         totalVictories += 1;
//       } else if (match.homeTeamGoals === match.awayTeamGoals) {
//         totalPoints += 1;
//         totalDraws += 1;
//       } else {
//         totalLosses += 1;
//       }
//     });

//     return { totalPoints, totalVictories, totalDraws, totalLosses };
//   }

//   public static sortLeaderboard(data: ILeaderboard[]) {
//     data.sort((a, b) => b.goalsOwn - a.goalsOwn);
//     data.sort((a, b) => b.goalsFavor - a.goalsFavor);
//     data.sort((a, b) => b.goalsBalance - a.goalsBalance);
//     data.sort((a, b) => b.totalPoints - a.totalPoints);

//     return data;
//   }
// }
