const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const employee = employees.find((emp) => emp.id === id);
  const specie = species.find((spe) => spe.id === employee.responsibleFor[0]);
  const olderAnimal = specie.residents.sort((animal1, animal2) => animal2.age - animal1.age);
  return Object.values(olderAnimal[0]);
}

module.exports = getOldestFromFirstSpecies;
