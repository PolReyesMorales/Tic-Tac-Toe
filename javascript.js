let turn = 0;
const board = [];
const emptyCell = "";

const startGame = () => {
  turn = 0;
  board.length = 0;
  document
    .querySelectorAll("button")
    .forEach((btn) => (btn.style.backgroundColor = emptyCell));
};

const btnPressed = (evt, pos) => {
  turn++;
  const btn = evt.target;
  const color = turn % 2 ? "salmon" : "paleGreen";

  if (!board[pos]) {
    btn.style.backgroundColor = color;
    board[pos] = color;
  }

  if (hasWon()) {
    Swal.fire(
      `Congratulations player ${color}!!`,
      "You are the winner!",
      "success"
    ).then(startGame);
  } else if (fullBoard()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The game was a draw!",
    }).then(startGame);
  }
};

const hasWon = () => {
  if (
    areEquals(0, 1, 2) ||
    areEquals(3, 4, 5) ||
    areEquals(6, 7, 8) ||
    areEquals(0, 3, 6) ||
    areEquals(1, 4, 7) ||
    areEquals(2, 5, 8) ||
    areEquals(0, 4, 8) ||
    areEquals(2, 4, 6)
  ) {
    return true;
  }

  return false;
};

const fullBoard = () => {
  if (board.filter((color) => color !== emptyCell).length >= 9) {
    return true;
  }

  return false;
};

const areEquals = (pos1, pos2, pos3) => {
  if (
    board[pos1] &&
    board[pos1] === board[pos2] &&
    board[pos1] === board[pos3]
  ) {
    return true;
  }

  return false;
};

document
  .querySelectorAll("button")
  .forEach((btn, index) =>
    btn.addEventListener("click", (e) => btnPressed(e, index))
  );

window.addEventListener("load", startGame);
