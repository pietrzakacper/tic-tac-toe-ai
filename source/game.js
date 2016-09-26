import {
	whichIfAnyPlayerWon,
	isDraw
} from './win';

function isTerminated(board) {
	return getStateOfGame(board) === 'not-end' ? false : true;
}

function getStateOfGame(board) {

	const supposedChampion = whichIfAnyPlayerWon(board);

	if (supposedChampion != 'none') {
		return supposedChampion + '-won';
	}

	if (isDraw(board)) {
		return 'draw';
	}

	return 'not-end';
}

function getGameScore(msg, aiCharacter, depth) {
	if (msg === aiCharacter + '-won') {
		return 10 - depth;
	} else if (msg === 'draw') {
		return 0;
	}
	return depth - 10;
}

function getAllMoves(board) {
	const possibleMoves = [];

	board.forEach(function(value, index) {
		if (value === 'e') {
			possibleMoves.push(index);
		}
	});

	return possibleMoves;
}

function getBoardAfterSimulatedMove(board, pos, char) {
	const newBoard = board.slice();
	newBoard[pos] = char;
	return newBoard;
}

export {
	getStateOfGame,
	isTerminated,
	getGameScore,
	getAllMoves,
	getBoardAfterSimulatedMove
};
