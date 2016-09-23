var AI = (function(module){
	var valid =  module.Validation;

	module.initialization = function(data, target) {
		if (!(target.aiCharacter =valid.aiCharacter(data.aiCharacter))) {
			console.log('AI: Initialization aborted: AI character initialization error!');
			return false;
		}

		if (!(target.playerCharacter = valid.playerCharacter(data.playerCharacter, data.aiCharacter))) {
			console.log('AI: Initialization aborted: Player character initialization error!');
			return false;
		}

		if (!(target.startingCharacter = valid.startingCharacter(data.startingCharacter))) {
			console.log('AI: Initialization aborted: Starting character initialization error!');
			return false;
		}

		if (!(target.board = valid.board(data.board, data.startingCharacter, data.aiCharacter))) {
			console.log('AI: Initialization aborted: board initialization error!');
			return false;
		}
		return true;
	};
	return module;
})(AI|| {});
