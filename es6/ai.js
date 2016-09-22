var AI = (function(module) {
	var Globals = {};

	function getAIAction(data, analyzeDepth = true){
		if (!module.initialization(data, Globals)) {
			console.log('AI: Action cannot be returned: invalid data passed to function!');
			return;
		}
		return module.miniMax.calculateValue(Globals.board, Globals.aiCharacter, Globals.aiCharacter, analyzeDepth).move;
	}

	function getBoardAfterAIMove(data,analyzeDepth=true){
		if (!module.initialization(data, Globals)) {
			console.log('AI: Board cannot be returned: invalid data passed to function!');
			return;
		}
		return module.miniMax.calculateValue(Globals.board, Globals.aiCharacter, Globals.aiCharacter, analyzeDepth).board;
	}
	
	return{
		getAIAction: getAIAction,
		isTerminated: function(board){
			return module.GameTools.isTerminated(board,true);
		},
		getStateOfGame: module.GameTools.isTerminated,
		getBoardAfterAIMove: getBoardAfterAIMove
	};
})(AI||{});