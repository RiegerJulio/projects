// Desafio 1
function compareTrue(param1, param2) {
  if (param1 === true && param2 === true) {
    return true;
  } return false;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(sentence) {
  let sentenceSplited = [];
  sentenceSplited = sentence.split(' ');
  return sentenceSplited;
}

// Desafio 4
function concatName(fullName) {
  return fullName[fullName.length - 1] + ', ' + fullName[0];
}

// Desafio 5
function footballPoints(wins, ties) {
  return wins * 3 + ties;
}

// Desafio 6
function highestCount(numbers) {
  let highestNumber = -1;
  let repeater = 0;

  for (const key in numbers) {
    if (highestNumber < numbers[key]) {
      highestNumber = numbers[key];
    }
  }

  for (const key in numbers) {
    if (highestNumber === numbers[key]) {
      repeater += 1;
    }
  } return repeater;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  cat1 = Math.abs(mouse - cat1);
  cat2 = Math.abs(mouse - cat2);
  if (cat1 < cat2) {
    return 'cat1';
  } if (cat2 < cat1) {
    return 'cat2';
  } return 'os gatos trombam e o rato foge';
} 
// used MathAbs to return the absolute value of the positions. REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs

// Desafio 8
function fizzBuzz(numbers) {
  let result = [];
  for (const key in numbers) {
    if (numbers[key] % 3 === 0 && numbers[key] % 5 === 0) {
      result.push('fizzBuzz');
    } else if (numbers[key] % 3 === 0) {
      result.push('fizz');
    } else if (numbers[key] % 5 === 0) {
      result.push('buzz');
    } else {
      result.push('bug!');
    }
  } return result;
}
console.log(fizzBuzz([2, 15, 7, 9, 45]));

// Desafio 9
function encode(string) {
  let result = '';
  for (const key in string) {
    if (string[key] === 'a') {
      result += 1;
    } else if (string[key] === 'e') {
      result += 2;
    } else if (string[key] === 'i') {
      result += 3;
    } else if (string[key] === 'o') {
      result += 4;
    } else if (string[key] === 'u') {
      result += 5;
    } else {
      result += string[key];
    }
  } return result;
}

function decode(string) {
    let result = '';
  for (const key in string) {
    if (string[key] === '1') {
      result += 'a';
    } else if (string[key] === '2') {
      result += 'e';
    } else if (string[key] === '3') {
      result += 'i';
    } else if (string[key] === '4') {
      result += 'o';
    } else if (string[key] === '5') {
      result += 'u';
    } else {
      result += string[key];
    }
  } return result;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
