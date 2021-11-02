// Desafio 10
function techList(tech, name) {
  tech.sort();
  let answer = [];
  for (let index = 0; index < tech.length; index += 1) {
    answer.push(
      {
        tech: tech[index],
        name,
      },
    );
  } if (answer.length === 0) {
    return 'Vazio!';
  } return answer;
}

// Desafio 11

function repeatableNumbers(numbers) {
  let counter = 0;
  for (let index = 0; index < numbers.length; index += 1) {
    for (let index2 = 0; index2 < numbers.length; index2 += 1) {
      if (numbers[index] === numbers[index2]) {
        counter += 1;
      } if (counter >= 3) {
        return true;
      } 
    } counter = 0;
  } return false;
}

function generatePhoneNumber(numbers) {
  let phoneNumber = '';
  let counter = 0;
  if (numbers.length !== 11) {
    phoneNumber = 'Array com tamanho incorreto.';
    return phoneNumber;
  }

  for (let index = 0; index < numbers.length; index += 1) {
    if (numbers[index] < 0 || numbers[index] > 9 || repeatableNumbers(numbers) === true) {
      phoneNumber = 'não é possível gerar um número de telefone com esses valores';
      return phoneNumber;
    } if (index == 0) {
      phoneNumber += `(${numbers[index]}`;
    } else if (index == 1) {
      phoneNumber += `${numbers[index]}) `;
    } else if (index == 6) {
      phoneNumber += `${numbers[index]}-`;
    } else {
      phoneNumber += numbers[index];
    }
  } return phoneNumber;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA > (lineB + lineC) || lineA < Math.abs(lineB - lineC)) {
    return false;
  } if (lineB > (lineA + lineC) || lineB < Math.abs(lineA - lineC)) {
    return false;
  } if (lineC > (lineA + lineB) || lineC < Math.abs(lineA - lineB)) {
    return false;
  }
  return true;
}

// Desafio 13
// I used the r var that means "one or more digits and the "g" at the end means global and made loop work." REF: https://stackoverflow.com/questions/1623221/how-to-find-a-number-in-a-string-using-javascript
// I used the match in amoutOfBeferages to match the r and the input of function
// I used the Number to convert the string into a number
function hydrate(amount) {
  let water = 0;
  let r = /\d+/g;
  let amountOfBeverages = amount.match(r);

  for (let key in amountOfBeverages) {
    water += Number(amountOfBeverages[key]);
  } if (water === 1) {
    return `${water} copo de água`;
  }
  return `${water} copos de água`;
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
