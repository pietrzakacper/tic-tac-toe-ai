var AI = (function(module){
	module.initialization = function(data, target) {
		if (!(target.aiCharacter = module.Validation.aiCharacter(data.aiCharacter))) {
			console.log('AI: Initialization aborted: AI character initialization error!');
			return false;
		}

		if (!(target.playerCharacter = module.Validation.playerCharacter(data.playerCharacter, data.aiCharacter))) {
			console.log('AI: Initialization aborted: Player character initialization error!');
			return false;
		}

		if (!(target.startingCharacter = module.Validation.startingCharacter(data.startingCharacter))) {
			console.log('AI: Initialization aborted: Starting character initialization error!');
			return false;
		}

		if (!(target.board = module.Validation.board(data.board, data.startingCharacter, data.aiCharacter))) {
			console.log('AI: Initialization aborted: board initialization error!');
			return false;
		}
		return true;
	}
	return module;
})(AI|| {});