/*-------------------------------- Constants --------------------------------*/
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

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function handleClick(evt) {
    const squareIndex = parseInt(evt.target.id);
    if (board[squareIndex] !== '' || winner) return;
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(i) {
    board[i] = turn;
    console.log(board);
}

function checkForWinner() {
    winningCombos.forEach(combo => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
        }
    });
    console.log(winner)
}

function checkForTie() {
    if (winner) return;
    tie = board.every(box => box !== '');
    console.log(tie);
}

function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
    console.log(turn);
}


function updateBoard() {
    board.forEach((value, i) => {
        squareEls[i].textContent = value;
      });
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn.`;
    } else if (!winner && tie) {
        messageEl.textContent = "It's a tie!";
    } else {
        messageEl.textContent = `Congratulations ${winner}! You have won!`;
    }
}

init();


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick)
});
resetBtnEl.addEventListener('click', init)



