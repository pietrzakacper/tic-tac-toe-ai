const validation = require('./validation.js');

exports.assignData = (data, target)=>{
	if(!(target.aiCharacter = validation.aiCharacter(data.aiCharacter))){
		console.log('AI: Initialization aborted: AI character initialization error!');
		return false;
	}

	if(!(target.playerCharacter = validation.playerCharacter(data.playerCharacter,data.aiCharacter))){
		console.log('AI: Initialization aborted: Player character initialization error!');
		return false;
	}

	if(!(target.startingCharacter = validation.startingCharacter(data.startingCharacter))){
		console.log('AI: Initialization aborted: Starting character initialization error!');
		return false;
	}

	if(!(target.board = validation.board(data.board, data.startingCharacter, data.aiCharacter))){
		console.log('AI: Initialization aborted: board initialization error!');
		return false;
	}
	console.log('AI: Initialization succed!');
	return true;

};
