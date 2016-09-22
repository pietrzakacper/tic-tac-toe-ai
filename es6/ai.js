var AI = (function() {
	var Globals = {};

	function getAIAction(data, analyzeDepth = true){
		if (!initialization(data, Globals)) {
			console.log('AI: Action cannot be returned: invalid data passed to function!');
			return;
		}
		return miniMax.calculateValue(Globals.board, Globals.aiCharacter, Globals.aiCharacter, analyzeDepth).move;
	}

	function getBoardAfterAIMove(data,analyzeDepth=true){
		if (!initialization(data, Globals)) {
			console.log('AI: Board cannot be returned: invalid data passed to function!');
			return;
		}
		return miniMax.calculateValue(Globals.board, Globals.aiCharacter, Globals.aiCharacter, analyzeDepth).board;
	}
	
	return{
		getAIAction: getAIAction,
		isTerminate: function(board){
			return GameTools.isTerminate(board,true);
		},
		getStateOfGame: GameTools.isTerminate,
		getBoardAfterAIMove: getBoardAfterAIMove
	};
})();