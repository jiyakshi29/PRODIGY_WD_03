const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let cells = [];
let currentPlayer = "X";
let gameActive = true;
let moves = 0;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell bg-slate-800 text-2xl font-bold flex items-center justify-center rounded-lg h-20 cursor-pointer glass";
    cell.dataset.index = i;
    cell.addEventListener("click", handleMove);
    board.appendChild(cell);
    cells.push(cell);
  }
  statusText.textContent = "Player X's Turn";
  gameActive = true;
  currentPlayer = "X";
  moves = 0;
}

function handleMove(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;
  moves++;

  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (moves === 9) {
    statusText.textContent = "🤝 It's a Tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    );
  });
}

resetBtn.addEventListener("click", createBoard);

// Initialize board
createBoard();
