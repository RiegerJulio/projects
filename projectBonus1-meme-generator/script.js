const memeText = document.querySelector('#meme-text');
const textInput = document.querySelector('#text-input');
const memeIMG = document.querySelector('#meme-image');
const imageInput = document.querySelector('#meme-insert');
const memeContainer = document.querySelector('#meme-image-container');
const btnWater = document.querySelector('#water');
const btnEarth = document.querySelector('#earth');
const btnFire = document.querySelector('#fire');
const sourceIMG = document.querySelector('#famous-img');
const generatedMeme1 = document.querySelector('#meme-1');
const generatedMeme2 = document.querySelector('#meme-2');
const generatedMeme3 = document.querySelector('#meme-3');
const generatedMeme4 = document.querySelector('#meme-4');

function textOnIMG() {
  memeText.innerText = textInput.value;
}

textInput.addEventListener('keyup', textOnIMG);

function srcOnIMG() {
  memeIMG.src = URL.createObjectURL(imageInput.files[0]);
}

imageInput.addEventListener('change', srcOnIMG);

function waterBorder() {
  memeContainer.style.border = '5px double blue';
}

btnWater.addEventListener('click', waterBorder);

function earthBorder() {
  memeContainer.style.border = '6px groove green';
}

btnEarth.addEventListener('click', earthBorder);

function fireBorder() {
  memeContainer.style.border = '3px dashed red';
}

btnFire.addEventListener('click', fireBorder);

function generatedMemes(img) {
  const generatedIMG = img.target.src;
  memeIMG.src = generatedIMG;
}

generatedMeme1.addEventListener('click', generatedMemes);
generatedMeme2.addEventListener('click', generatedMemes);
generatedMeme3.addEventListener('click', generatedMemes);
generatedMeme4.addEventListener('click', generatedMemes);

