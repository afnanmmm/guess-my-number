'use strict';

const newMessage = document.querySelector('.message');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');

let number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMsg = function (message) {
  newMessage.textContent = message;
};

const stylePage = function (color, width) {
  document.querySelector('body').style.backgroundColor = color;
  document.querySelector('.number').style.width = width;
};

checkBtn.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //when there's no guess
  if (!guess) {
    displayMsg(`No number!`);

    //when player wins
  } else if (guess === number) {
    displayMsg(`Correct Number!`);
    stylePage('#60b347', '30rem');
    document.querySelector('.number').textContent = number;

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    //when guess is not correct
  } else if (guess !== number) {
    if (score > 1) {
      displayMsg(guess > number ? `Too High!!` : `Too Low!!`);
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMsg(`You lost the game!`);
      document.querySelector('.score').textContent = 0;
    }
  }
});

againBtn.addEventListener('click', function () {
  score = 20;
  number = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  displayMsg('Start guessing...');
  document.querySelector('.guess').value = '';
  stylePage('#222', '15rem');
});
