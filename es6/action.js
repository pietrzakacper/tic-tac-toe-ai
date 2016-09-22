var AI=(function(module){
    module.Action = class Action{
		constructor(move){
			this.move = move;
			this.boardAfterMove = [];
			this.score = -1000;
		}
	}
	return module;
}
)(AI||{});