
	function initialization(data, target) {
		if (!(target.aiCharacter = Validation.aiCharacter(data.aiCharacter))) {
			console.log('AI: Initialization aborted: AI character initialization error!');
			return false;
		}

		if (!(target.playerCharacter = Validation.playerCharacter(data.playerCharacter, data.aiCharacter))) {
			console.log('AI: Initialization aborted: Player character initialization error!');
			return false;
		}

		if (!(target.startingCharacter = Validation.startingCharacter(data.startingCharacter))) {
			console.log('AI: Initialization aborted: Starting character initialization error!');
			return false;
		}

		if (!(target.board = Validation.board(data.board, data.startingCharacter, data.aiCharacter))) {
			console.log('AI: Initialization aborted: board initialization error!');
			return false;
		}
		return true;
	}
	