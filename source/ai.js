var AI = (function(module) {
	var init = module.initialization;
	var minimax = module.miniMax.calculateValue;

	function getAIAction(data) {
		var checkedData = {};
		if (!init(data, checkedData)) {
			console.log('AI: Action cannot be returned: invalid data passed to function!');
			return;
		}
		return minimax(checkedData.board, checkedData.aiCharacter, checkedData.aiCharacter, 0);
	}

	return {
		getAIMove: function(data){
			return (getAIAction(data)).move;
		},
		getBoardAfterAIMove: function(data){
			return (getAIAction(data)).board;
		},
		isTerminated: module.GameTools.isTerminated,
		getStateOfGame: module.GameTools.getStateOfGame
	};
})(AI || {});
