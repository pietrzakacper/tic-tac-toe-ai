var miniMax = (function() {
		var calculateValue = (board, character, aiCharacter, analyzeDepth, depth = 0) => {
			const isTerminateMsg = GameTools.isTerminate(board);
			if (isTerminateMsg !== 'not-end') {
				const tmpAction = new Action(-1);
				tmpAction.score = GameTools.getGameScore(isTerminateMsg, aiCharacter, depth);
				return tmpAction;
			}
			const possibleMoves = GameTools.getAllMoves(board);
			const actions = [];
			possibleMoves.forEach(move => {
				const action = new Action(move);
				action.board = GameTools.getBoardAfterSimulatedMove(board, move, character);
				action.score = calculateValue(action.board, (character === 'x') ? 'o' : 'x', aiCharacter, analyzeDepth, (analyzeDepth) ? depth + 1 : 0).score;
				actions.push(action);
			});

			if (character === aiCharacter) {
				actions.sort(ACTION_ASCENDING);
			} else {
				actions.sort(ACTION_DESCENDING);
			}

			return actions[0];
		};

		var ACTION_ASCENDING = (a, b) => b.score - a.score;

		var ACTION_DESCENDING = (a, b) => a.score - b.score;

		return {
			calculateValue: calculateValue
		};
	})();