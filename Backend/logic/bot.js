
const VICTORIES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

function checkWinner(board) {
    for (let i = 0; i < VICTORIES.length; i++) {
        const [a, b, c] = VICTORIES[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    if (!board.includes(null) && !board.includes("")) return 'tie';
    return null;
}

function minimax(board, depth, isMaximizing, botSymbol, playerSymbol) {
    const result = checkWinner(board);
    if (result === botSymbol) return 10 - depth;
    if (result === playerSymbol) return depth - 10;
    if (result === 'tie') return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "" || board[i] === null) {
                board[i] = botSymbol;
                let score = minimax(board, depth + 1, false, botSymbol, playerSymbol);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "" || board[i] === null) {
                board[i] = playerSymbol;
                let score = minimax(board, depth + 1, true, botSymbol, playerSymbol);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

const getBestMove = (board, botSymbol, playerSymbol) => {
    let bestScore = -Infinity;
    let move = -1;
    

    let tempBoard = [...board];

    for (let i = 0; i < 9; i++) {
        if (tempBoard[i] === "" || tempBoard[i] === null) {
            tempBoard[i] = botSymbol;
            let score = minimax(tempBoard, 0, false, botSymbol, playerSymbol);
            tempBoard[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
};

module.exports = { getBestMove };