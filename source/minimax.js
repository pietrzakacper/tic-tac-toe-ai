import Action from './action';
import * as GameTools from './game';


export default function calculateValue(board, character, aiCharacter, depth) {

	const gameState = GameTools.getStateOfGame(board);
	//if simulated game is terminated
	if (gameState != 'not-end') {
		const tmpAction = new Action(-1);
		//evaluate game
		tmpAction.score = GameTools.getGameScore(gameState, aiCharacter, depth);
		return tmpAction;
	}

	const actions = [];

	GameTools.getAllMoves(board).forEach(move => {
		const action = new Action(move);
		action.board = GameTools.getBoardAfterSimulatedMove(board, move, character);
		action.score = calculateValue(action.board, character === 'x' ? 'o' : 'x', aiCharacter, depth + 1).score;
		actions.push(action);
	});

	//sort actions depending on which player (MAX or MIN) is making move
	actions.sort(character === aiCharacter ? ACTION_ASCENDING : ACTION_DESCENDING);

	//return best action
	return actions[0];
}

const ACTION_ASCENDING = (a, b) => b.score - a.score;

const ACTION_DESCENDING = (a, b) => a.score - b.score;
