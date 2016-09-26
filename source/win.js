function whichIfAnyPlayerWon(board) {
	const characters = ['x', 'o'];

	for (let i = 0; i < characters.length; ++i) {
		if (hasWon(characters[i], board)) {
			return characters[i];
		}
	}
	return 'none';
}

function isDraw(board) {
	for (let i = 0; i < board.length; ++i) {
		if (board[i] === 'e') {
			return false;
		}
	}
	return true;
}

function hasWon(char, board) {

	if (isColumnWin(char, board) || isRowWin(char, board) || isDiagonalWin(char, board)) {
		return true;
	}

	return false;
}

function isColumnWin(char, board) {
	for (let i = 0; i < 3; ++i) {
		if (char === board[i] && char === board[i + 3] && char === board[i + 6]) {
			return true;
		}
	}
	return false;
}

function isRowWin(char, board) {
	for (let i = 0; i <= 6; i += 3) {
		if (char === board[i] && char === board[i + 1] && char === board[i + 2]) {
			return true;
		}
	}
	return false;
}

function isDiagonalWin(char, board) {
	return char === board[0] && char === board[4] && char == board[8] ||
		char === board[2] && char === board[4] && char == board[6];
}

export {
	whichIfAnyPlayerWon,
	isDraw
};
