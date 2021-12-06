const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const findSpecie = species.find((specie) => specie.name === animal);
  return findSpecie.residents.every((resident) => resident.age > age);
}

module.exports = getAnimalsOlderThan;
