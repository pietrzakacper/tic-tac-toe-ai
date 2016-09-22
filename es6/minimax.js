exports.miniMax = miniMax;

const game = require('./game.js');
const Action = require('./action.js').Action;

function miniMax(board, character, aiCharacter,analyzeDepth, depth=0) {
	const isTerminateMsg = game.isTerminate(board);
	if (isTerminateMsg !== 'not-end') {
		const tmpAction = new Action(-1);
		tmpAction.score = game.getGameScore(isTerminateMsg, aiCharacter,depth);
		return tmpAction;
	}
	const possibleMoves = game.getAllMoves(board);
	const actions = [];
	possibleMoves.forEach(move => {
		const action = new Action(move);
		action.board=getBoardAfterSimulatedMove(board, move, character);
		action.score = miniMax(action.board, (character === 'x') ? 'o' : 'x', aiCharacter,analyzeDepth,(analyzeDepth)?depth+1:0).score;
		actions.push(action);
	});

	if (character === aiCharacter) {
		actions.sort(ACTION_ASCENDING);
	} else {
		actions.sort(ACTION_DESCENDING);
	}

	return actions[0];
}

function getBoardAfterSimulatedMove(board, pos, char) {
	const newBoard = [];
	board.forEach((val) => {
		newBoard.push(val);
	});

	newBoard[pos] = char;
	return newBoard;
}

function ACTION_ASCENDING(a, b) {

	return b.score - a.score;
}

function ACTION_DESCENDING(a, b) {

	return a.score - b.score;
}
