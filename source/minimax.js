var Action = require('./action.js');
var tools = require('./game.js');
module.exports = (function() {

	function calculateValue(board, character, aiCharacter, depth) {

		var gameState = tools.getStateOfGame(board);
		//if simulated game is terminated
		if (gameState != 'not-end') {
			var tmpAction = new Action(-1);
			//evaluate game
			tmpAction.score = tools.getGameScore(gameState, aiCharacter, depth);
			return tmpAction;
		}

		var actions = [];

		tools.getAllMoves(board).forEach(function(move) {
			var action = new Action(move);
			action.board = tools.getBoardAfterSimulatedMove(board, move, character);
			action.score = calculateValue(action.board, character === 'x' ? 'o' : 'x', aiCharacter, depth + 1).score;
			actions.push(action);
		});

		//sort actions depending on which player MAX or MIN is making move
		actions.sort(character === aiCharacter ? ACTION_ASCENDING : ACTION_DESCENDING);

		//return best action
		return actions[0];
	}

	function ACTION_ASCENDING(a, b) {
		return b.score - a.score;
	}

	function ACTION_DESCENDING(a, b) {
		return a.score - b.score;
	}

	return {
		calculateValue: calculateValue
	};
})();
