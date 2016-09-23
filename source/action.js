var AI = (function(module) {
	module.Action = function(move) {
		this.move = move;
		this.boardAfterMove = [];
		this.score = -1000;
	};
	return module;
})(AI || {});
