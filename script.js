"use strict";
const gameBoard = document.querySelector(".game-board");
const restartBtn = document.querySelector(".restart-btn");
const againBtn = document.querySelector(".again-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const playerOne = document.querySelector(".player-1");
const playerTwo = document.querySelector(".player-2");

(() => {
  const squares = Array.from(document.querySelectorAll(".square"));
  squares.forEach((square, i) => {
    square.dataset.index = squares.indexOf(squares[i]);
  });
})();

const player1 = { playerChoice: [] };
const player2 = { playerChoice: [] };

function addClass(cssClass, ...el) {
  el.forEach((e) => e.classList.add(cssClass));
}

function removeClass(cssClass, ...el) {
  el.forEach((e) => e.classList.remove(cssClass));
}

function isWinning(player) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombos.some((combo) =>
    combo.every((squareNumber) => player.playerChoice.includes(squareNumber))
  );
}

function renderResult(playerNum) {
  const result = modal.querySelector(".result");

  removeClass("active", playerOne, playerTwo);
  removeClass("hidden", modal, overlay);
  result.innerHTML = `${playerNum ? `PLAYER ${playerNum} WIN!` : "TIE!"}`;
}

function restart() {
  player1.playerChoice = [];
  player2.playerChoice = [];
  document
    .querySelectorAll(".icon")
    .forEach((icon) => addClass("hidden", icon));
  addClass("hidden", modal, overlay);
  addClass("active", playerOne);
  removeClass("active", playerTwo);
}

gameBoard.addEventListener("click", (e) => {
  const square = e.target.closest(".square");
  if (!square) return;

  const squareIndex = +square.dataset.index;
  const condition =
    !player2.playerChoice.includes(squareIndex) &&
    !player1.playerChoice.includes(squareIndex);

  if (player1.playerChoice.length === player2.playerChoice.length) {
    if (condition) {
      removeClass("active", playerOne);
      addClass("active", playerTwo);
      player1.playerChoice.push(squareIndex);
      removeClass("hidden", square.querySelector(".x"));
      if (isWinning(player1)) renderResult("1");
    }
  } else {
    if (condition) {
      removeClass("active", playerTwo);
      addClass("active", playerOne);
      player2.playerChoice.push(squareIndex);
      removeClass("hidden", square.querySelector(".o"));
      if (isWinning(player2)) renderResult("2");
    }
  }

  if (
    player1.playerChoice.length + player2.playerChoice.length === 9 &&
    !isWinning(player1) &&
    !isWinning(player2)
  ) {
    renderResult();
  }
});

restartBtn.addEventListener("click", restart);
againBtn.addEventListener("click", restart);
