'use strict';

let secretNumber = Math.trunc(Math.random() * 100) + 1;
//document.querySelector('.number').textContent = secretNumber;
let score = 100;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);
  console.log(secretNumber, typeof secretNumber);
  console.log(guess, typeof guess);
  if (!guess) {
    displayMessage('⛔ No number!');
  } else {
    if (guess !== secretNumber) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      if (score > 1) {
        score-=5;
        document.querySelector('.score').textContent = score;
      } else {
        score = 0;
        document.querySelector('.score').textContent = score;
        displayMessage('💥 You lose the game!');
      }
    } else {
      displayMessage('🎉 Correct number!');
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
      }
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  let guess = Number((document.querySelector('.guess').value = ''));
  displayMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#000';
  document.querySelector('.number').style.width = '15rem';
  score = 100;
  document.querySelector('.score').textContent = score;
  secretNumber = Math.trunc(Math.random() * 100) + 1;
  document.querySelector('.number').textContent = '?';
});

