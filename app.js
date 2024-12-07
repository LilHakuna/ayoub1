let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const gameBoardElement = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

// Create the board squares
function createBoard() {
    gameBoardElement.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const square = document.createElement('div');
        square.textContent = cell;
        square.addEventListener('click', () => handleClick(index));
        gameBoardElement.appendChild(square);
    });
}

// Handle a square click
function handleClick(index) {
    if (gameBoard[index] !== '') return; // Prevent override
    gameBoard[index] = currentPlayer;
    createBoard();
    if (checkWin()) {
        alert(`${currentPlayer} Wins!`);
        resetGame();
    } else if (gameBoard.every(cell => cell !== '')) {
        alert('It\'s a Tie!');
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check if a player has won
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    createBoard();
}

// Initialize the game
createBoard();
resetButton.addEventListener('click', resetGame);
