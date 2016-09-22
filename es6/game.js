
exports.isTerminate = isTerminate;

exports.getGameScore = getGameScore;

exports.getAllMoves = getAllMoves;

function isTerminate(board, onlyBoolean=false){
	const chars = ['x', 'o'];
	for (let i = 0; i < 2; ++i) {
		if (hasWon(chars[i], board)) {
			if(onlyBoolean){
				return true;
			}
			return `${chars[i]}-won`;
		}
	}

	for (let i = 0; i < 9; ++i) {
		if (board[i] === 'e') {
			if(onlyBoolean){
				return false;
			}
			return 'not-end';
		}
	}
	if(onlyBoolean){
		return true;
	}
	return 'draw';
}

function getGameScore(msg, aiCharacter,depth){
	if (msg === `${aiCharacter}-won`) {
		return 10-depth;
	} else if (msg === 'draw') {
		return 0;
	}
	return depth-10;
}

function getAllMoves(board){
	const possibleMoves = [];

	board.forEach((value, index) => {
		if (value === 'e') {
			possibleMoves.push(index);
		}
	});

	return possibleMoves;
}

function hasWon(char, board) {
	for (let i = 0; i < 3; ++i) {
		if (char === board[i] && char === board[i + 3] && char === board[i + 6]) {
			return true;
		}
	}

	for (let i = 0; i <= 6; i += 3) {
		if (char === board[i] && char === board[i + 1] && char === board[i + 2]) {
			return true;
		}
	}

	if (char === board[0] && char === board[4] && char == board[8]) {
		return true;
	}
	if (char === board[2] && char === board[4] && char == board[6]) {
		return true;
	}
	return false;
}
