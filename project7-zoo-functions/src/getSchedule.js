const { species, hours } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const visitDays = () => {
  const visit = {};
  Object.entries(hours).forEach(([day, hour]) => {
    visit[day] = { officeHour: '', exhibition: '' };
    if (day === 'Monday') {
      visit[day].officeHour = 'CLOSED';
      visit[day].exhibition = 'The zoo will be closed!';
    } else {
      visit[day].officeHour = `Open from ${hour.open}am until ${hour.close}pm`;
      visit[day].exhibition = species.filter(({ availability }) => availability
        .some((days) => days === day)).map(({ name }) => name);
    }
  });
  return visit;
};

function getSchedule(scheduleTarget) {
  const visit = visitDays();
  const day = Object.keys(visit).some((days) => days === scheduleTarget);
  const animals = species.some((animal) => animal.name === scheduleTarget);
  if (day === true) {
    const dayObj = {};
    Object.entries(visit).filter(([days]) => days === scheduleTarget)
      .forEach(([day1, time]) => {
        dayObj[day1] = time;
      });
    return dayObj;
  } if (animals === true) {
    return species.find((specie) => specie.name === scheduleTarget).availability;
  }
  return visit;
}

module.exports = getSchedule;
