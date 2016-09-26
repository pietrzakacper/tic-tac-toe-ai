var init = require('./init.js').initialization;
var minimax = require('./minimax.js').calculateValue;
var tools = require('./game.js');

exports.AI = (function() {
	function getAIAction(data) {
		var checkedData = {};
		init(data, checkedData);
		return minimax(checkedData.board, checkedData.aiCharacter, checkedData.aiCharacter, 0);
	}

	return {
		getAIMove: function(data) {
			return (getAIAction(data)).move;
		},
		getBoardAfterAIMove: function(data) {
			return (getAIAction(data)).board;
		},
		isTerminated: tools.isTerminated,
		getStateOfGame: tools.getStateOfGame
	};
})();
