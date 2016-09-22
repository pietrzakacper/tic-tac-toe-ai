const initialization = require('./init.js');
const minmax = require('./minimax.js').miniMax;
var AI = {Globals:{}};


AI.dataTemplate = {
	aiCharacter: 'o',
	playerCharacter: 'x',
	startingCharacter: 'o',
	board: ['e','e','e',
					'e','e','e',
					'e','e','e']
};

AI.getAIAction = (data, analyzeDepth = true)=>{
	if(!initialization.assignData(data, AI.Globals)){
		console.log('AI: ai action cannot be returned: invalid data passed to function!');
		return;
	}
	console.log(minmax(AI.Globals.board, AI.Globals.aiCharacter, AI.Globals.aiCharacter, analyzeDepth).move);
};

AI.getAIAction(AI.dataTemplate);
