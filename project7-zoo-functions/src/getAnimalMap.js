const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const groupingLocations = () => {
  const animalsPlace = {
    NW: species.filter((specie) => specie.location === 'NW')
      .map((animal) => animal.name),
    NE: species.filter((specie) => specie.location === 'NE')
      .map((animal) => animal.name),
    SW: species.filter((specie) => specie.location === 'SW')
      .map((animal) => animal.name),
    SE: species.filter((specie) => specie.location === 'SE')
      .map((animal) => animal.name),
  };
  return animalsPlace;
};

const getAnimalsByOptions = (sorted, sex) => {
  const obj = {};
  species.forEach((specie) => {
    if (obj[specie.location] === undefined) {
      obj[specie.location] = [];
    }
    let residents = [...specie.residents];
    if (sex === 'male' || sex === 'female') {
      residents = residents.filter((sexOfSpecie) => sexOfSpecie.sex === sex);
    }
    residents = residents.map((resident) => resident.name);
    if (sorted === true) {
      residents.sort();
    }
    obj[specie.location].push({ [specie.name]: residents });
  });
  return obj;
};

function getAnimalMap(options) {
  if (options === undefined) {
    return groupingLocations();
  }
  const { includeNames, sorted, sex } = options;
  if (includeNames === true) {
    return getAnimalsByOptions(sorted, sex);
  } return getAnimalMap();
}

console.log(getAnimalMap({ includeNames: true, sex: 'female', sorted: true }));

module.exports = getAnimalMap;
