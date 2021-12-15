const { prices } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const countChild = entrants.filter((entrant) => entrant.age < 18).length;
  const countAdults = entrants.filter((entrant) => entrant.age >= 18 && entrant.age < 50).length;
  const countSenior = entrants.filter((entrant) => entrant.age >= 50).length;
  return { child: countChild, adult: countAdults, senior: countSenior };
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const calc = countEntrants(entrants);
  const cost = calc.child * prices.child + calc.adult * prices.adult + calc.senior * prices.senior;
  return cost;
}

module.exports = { calculateEntry, countEntrants };
