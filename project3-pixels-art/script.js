// Criando o pixel Board / Creating the pixels board

const pixelBoard = document.getElementById('pixel-board');
function createPixels() {
  for (let i = 0; i < 25; i += 1) {
    const pixels = document.createElement('div');
    pixels.className = 'pixel';
    pixelBoard.appendChild(pixels);
  }
}

createPixels();

// puxando as cores / pulling the colors
const colorBlack = document.querySelector('.black-color');
const colorPurple = document.querySelector('.purple-color');
const colorYellow = document.querySelector('.yellow-color');
const colorRed = document.querySelector('.red-color');
const pixel = document.querySelectorAll('.pixel');
const eraser = document.querySelector('#clear-board');

// Setando qual cor tera a classe selected. / selecting which color will have the selected class
// ainda quero transformar todas essas funções em uma só porém não consegui.
colorBlack.classList.add('selected');

function colorBlackChosen() {
  colorBlack.classList.add('selected');
  colorPurple.classList.remove('selected');
  colorYellow.classList.remove('selected');
  colorRed.classList.remove('selected');
}

colorBlack.addEventListener('click', colorBlackChosen);

function colorPurpleChosen() {
  colorBlack.classList.remove('selected');
  colorPurple.classList.add('selected');
  colorYellow.classList.remove('selected');
  colorRed.classList.remove('selected');
}

colorPurple.addEventListener('click', colorPurpleChosen);

function colorYellowChosen() {
  colorBlack.classList.remove('selected');
  colorPurple.classList.remove('selected');
  colorYellow.classList.add('selected');
  colorRed.classList.remove('selected');
}

colorYellow.addEventListener('click', colorYellowChosen);

function colorRedChosen() {
  colorBlack.classList.remove('selected');
  colorPurple.classList.remove('selected');
  colorYellow.classList.remove('selected');
  colorRed.classList.add('selected');
}

colorRed.addEventListener('click', colorRedChosen);

// nota: Estava tentando fazer esse exercício e na hora de puxar os valores, eu não conseguia. Fui pesquisar e vi que quando o css é linkado, eu preciso usar algum método de puxar e achei na documentação o 'getComputedStyle' que retorna um objeto com todos os valores do CSS do elemento. E para pegar um especifico eu usei o getPropertyValue. Então resolvi criar um for e dentro dele deixar todos os 'pixels' esperando para receber o valor do ('.selected') que foi puxado via computedstyle/propertyvalue na variavel colorpicker. depois transformei o bg do pixel usando o target.style com o valor do colorpicker; REF: https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

// leaving the pixels ready to be painted with the selected color

for (let index = 0; index < pixel.length; index += 1) {
  pixel[index].addEventListener('click', function (selectedPixel) {
    const chosenColor = document.querySelector('.selected');
    const colorPicker = window.getComputedStyle(chosenColor).getPropertyValue('background-color');
    selectedPixel.target.style.backgroundColor = colorPicker;
  }); 
}

// limpando os pixels / cleaning the pixels

function clearBoard() {
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'white';
  }
}

eraser.addEventListener('click', clearBoard);