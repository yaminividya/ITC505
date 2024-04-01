// Tic-Tac-Toe Game Implementation
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let gameActive = false; // Variable to track if the game is active

function handleClick(row, col) {
    if (!gameActive) return; // If game is not active, do nothing
    if (gameBoard[row][col] === '') {
        gameBoard[row][col] = currentPlayer;
        document.getElementsByClassName('cell')[row * 3 + col].innerText = currentPlayer;
        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerTurn();
        }
    }
}

function checkWinner() {
    // Check rows, columns, and diagonals for a winner
    for (let i = 0; i < 3; i++) {
        if (
            gameBoard[i][0] !== '' &&
            gameBoard[i][0] === gameBoard[i][1] &&
            gameBoard[i][0] === gameBoard[i][2]
        ) {
            return true; // Row match
        }
        if (
            gameBoard[0][i] !== '' &&
            gameBoard[0][i] === gameBoard[1][i] &&
            gameBoard[0][i] === gameBoard[2][i]
        ) {
            return true; // Column match
        }
    }
    if (
        gameBoard[0][0] !== '' &&
        gameBoard[0][0] === gameBoard[1][1] &&
        gameBoard[0][0] === gameBoard[2][2]
    ) {
        return true; // Diagonal match (top-left to bottom-right)
    }
    if (
        gameBoard[0][2] !== '' &&
        gameBoard[0][2] === gameBoard[1][1] &&
        gameBoard[0][2] === gameBoard[2][0]
    ) {
        return true; // Diagonal match (top-right to bottom-left)
    }
    return false; // No winner
}

function resetGame() {
    // Reset the game board, player turn, and UI
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameActive = true; // Set game as active
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    updatePlayerTurn();
}

function startGame() {
    // Start the game and update UI
    resetGame();
    document.getElementById('gameStatus').innerText = `Player ${currentPlayer}'s turn`;
}

function updatePlayerTurn() {
    document.getElementById('gameStatus').innerText = `Player ${currentPlayer}'s turn`;
}

// Add event listener to start game button
document.getElementById('startGameButton').addEventListener('click', startGame);

// Add event listener to reset game button
document.getElementById('resetGameButton').addEventListener('click', resetGame);
