let isGamePlaying, score, round, diceRoll, activePlayer;

const btnRoll = document.querySelector('.btn-roll');
const btnNewGame = document.querySelector('.btn-new');
const diceImgOne = document.querySelector('.dice-1');
const diceImgTwo = document.querySelector('.dice-2');

init();

btnRoll.addEventListener('click', function() {
  const diceOne = Math.floor(Math.random() * 6) + 1;
  const diceTwo = Math.floor(Math.random() * 6) + 1;
  let sum = diceOne + diceTwo;
  diceImgOne.setAttribute('src', 'img/dice-' + diceOne + '.png');
  diceImgTwo.setAttribute('src', 'img/dice-' + diceTwo + '.png');

  diceImgOne.style.display = 'block';
  diceImgTwo.style.display = 'block';

  if (diceRoll % 2) {
    document.querySelector(
      '.heading-round'
    ).innerText = `Round ${(round += 1)}`;
  }

  if (isGamePlaying) {
    isGameOver();
    addScore(sum);
    diceRoll++;
  }
});

btnNewGame.addEventListener('click', init);

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  document.getElementById('player-0').classList.toggle('active');
  document.getElementById('player-1').classList.toggle('active');
}

function init() {
  score = [0, 0];
  activePlayer = 0;
  diceRoll = 0;
  round = 2;

  document.querySelector('.heading-round').innerText = 'Round 2';

  diceImgOne.style.display = 'none';
  diceImgTwo.style.display = 'none';

  document.getElementById('player-name-0').innerText = 'Player One';
  document.getElementById('player-name-0').classList.remove('active');
  document.getElementById('player-name-1').innerText = 'Player Two';
  document.getElementById('player-name-1').classList.remove('active');
  document.getElementById('score-1').innerText = 0;
  document.getElementById('score-0').innerText = 0;

  isGamePlaying = true;
}

function isGameOver() {
  if (round > 12) {
    if (score[0] > score[1]) {
      document.getElementById('player-name-0').innerText = 'Winner';
      document.getElementById('player-name-0').classList.remove('active');
    } else if (score[0] === score[1]) {
      document.getElementById('player-name-0').innerText = "It's A Tie";
      document.getElementById('player-name-1').innerText = "It's A Tie";
    } else {
      document.getElementById('player-name-1').innerText = 'Winner';
      document.getElementById('player-name-1').classList.remove('active');
    }
    isGamePlaying = false;
    document.querySelector('.heading-round').innerText = 'Game Over';
  }
}

function addScore(sum) {
  if (sum === round) {
    score[activePlayer] += sum;
    document.getElementById('score-' + activePlayer).innerText =
      score[activePlayer];
    nextPlayer();
  } else {
    nextPlayer();
  }
}
