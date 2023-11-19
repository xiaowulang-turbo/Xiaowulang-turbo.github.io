"use strict";

let player = 0;
//let scoreEl = document.querySelector(`#score--${player}`);
//scoreEl.textContent = 0;
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.getElementById("current--1");
//let currentScoreEl = document.getElementById(`pig-game/current--${player}`);
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//scoreEl.textContent = 0;
//score1El.textContent = 0;
diceEl.classList.add("hidden");

let currentScore = 0;
let score = 0;
let flag = 1;
//currentScoreEl.textContent = 0;
//let player = 0;

const playerChange = function () {
  document
    .querySelector(`.player--${player}`)
    .classList.remove("player--active");
  player = player ? 0 : 1;
  document.querySelector(`.player--${player}`).classList.add("player--active");
};

btnRoll.addEventListener("click", function () {
  if (flag == 1) {
    const dice = Number(Math.trunc(Math.random() * 6 + 1));
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    console.log(`dice=${dice}`);
    //console.log(currentScoreEl.id);
    if (dice === 1) {
      currentScore = 0;
      document.getElementById(`current--${player}`).textContent = 0;
      playerChange();
    } else {
      currentScore += dice;
    }
    //console.log(`currentScore=${currentScore}`);
    document.getElementById(`current--${player}`).textContent = currentScore;
  }
});

btnHold.addEventListener("click", function () {
  if (flag == 1) {
    score = Number(document.querySelector(`#score--${player}`).textContent);
    score += Number(currentScore);
    if (score >= 30) {
      document
        .querySelector(`.player--${player}`)
        .classList.add("player--winner");
      flag = 0;
    } else {
      playerChange();
    }
    document.querySelector(`#score--${player}`).textContent = score;
    currentScore = 0;
    score = 0;
    document.getElementById(`current--${player}`).textContent = currentScore;
  }

  //currentScore.textContent
});

btnNew.addEventListener("click", function () {
  flag = 1;
  document
    .querySelector(`.player--${player}`)
    .classList.remove("player--winner");
  currentScore = 0;
  score = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
});
