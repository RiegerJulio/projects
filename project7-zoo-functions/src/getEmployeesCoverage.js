const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const searchEmployee = (person) => employees.find((emp) => person.name === emp.firstName
  || person.name === emp.lastName || person.id === emp.id);

const searchSpecies = (employee) => employee.responsibleFor.map((id) =>
  species.find((specie) => specie.id === id));

const employeeInfos = () => employees.map((employee) => {
  const searchSpe = searchSpecies(employee);
  return {
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    species: searchSpe.map((specie) => specie.name),
    locations: searchSpe.map((specie) => specie.location),
  };
});

function getEmployeesCoverage(person) {
  if (person === undefined) {
    return employeeInfos();
  }
  const employee = searchEmployee(person);
  if (employee === undefined) {
    throw new Error('Informações inválidas');
  }
  const speciesSearch = searchSpecies(employee);
  return {
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    species: speciesSearch.map((specie) => specie.name),
    locations: speciesSearch.map((specie) => specie.location),
  };
}

module.exports = getEmployeesCoverage;
