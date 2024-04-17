"use strict";
const gameBoard = document.querySelector(".game-board");
const restartBtn = document.querySelector(".restart-btn");
const againBtn = document.querySelector(".again-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const squares = Array.from(document.querySelectorAll(".square"));

squares.forEach((square, i) => {
  square.dataset.index = squares.indexOf(squares[i]);
});

const player1 = { player: 1, playerChoice: [] };
const player2 = { player: 2, playerChoice: [] };

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
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  result.innerHTML = `${playerNum ? `PLAYER ${playerNum} WIN!` : "TIE!"}`;
}

function restart() {
  player1.playerChoice = [];
  player2.playerChoice = [];
  document
    .querySelectorAll(".icon")
    .forEach((icon) => icon.classList.add("hidden"));
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
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
      player1.playerChoice.push(squareIndex);
      square.querySelector(".x").classList.remove("hidden");
      if (isWinning(player1)) renderResult("1");
    }
  } else {
    if (condition) {
      player2.playerChoice.push(squareIndex);
      square.querySelector(".o").classList.remove("hidden");
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
