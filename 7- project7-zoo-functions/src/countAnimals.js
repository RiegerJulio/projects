const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function countAnimals(animal) {
  const listSpecies = {};
  if (animal === undefined) {
    species.forEach((specie) => { listSpecies[specie.name] = specie.residents.length; });
    return listSpecies;
  }
  if (Object.keys(animal).length === 1) {
    return species.find((specie) => specie.name === animal.specie).residents.length;
  }
  if (Object.keys(animal).length > 1) {
    const oneSpecie = species.find((specie) => specie.name === animal.specie);
    const sexFinder = oneSpecie.residents.filter((resident) => resident.sex === animal.sex);
    return sexFinder.length;
  }
}

module.exports = countAnimals;

console.log((countAnimals({ specie: 'giraffes', sex: 'female' })));

// 1o if = se não fosse insertado algum animal, busquei em todas as especies e retornei o nome da especie + o seu tamanho de especies.
// 2o if = se só fosse insertado 1 argumento (nome do animal), busquei em todas as especies e retornei quantos tinham dela.
// 3o if = se 2 argumentos fossem inseridos (sexo e especie), busquei em todas as especies e peguei todas que se encaixavam no sexo e depois filtrei elas pra achar as do sexo necessitado.
