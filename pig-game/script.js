'use strict';

//selecting elements
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const dicePic = document.querySelector('.dice');

const score0El = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let totalScores, currntScore, activePlayer, playing;

//starting conditions
const init = function () {
  totalScores = [0, 0];
  currntScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dicePic.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//switching player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currntScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
rollBtn.addEventListener('click', function () {
  if (playing) {
    //1. generate a random dice roll
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //2. display dice
    dicePic.classList.remove('hidden');
    dicePic.src = `dice-${diceNumber}.png`;

    //3.check if rolled = 1
    if (diceNumber !== 1) {
      currntScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currntScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//hold button functionality
holdBtn.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player total score
    totalScores[activePlayer] += currntScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    //2. check if a player's score >= 100
    if (totalScores[activePlayer] >= 100) {
      //end game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dicePic.classList.add('hidden');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//new game button functionality
newGameBtn.addEventListener('click', init);
