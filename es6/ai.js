const initialization = require('./init.js');

var AI = AI || {};
AI.Globals = AI.Globals || {};


AI.dataTemplate = {
	aiCharacter: 'x',
	playerCharacter: 'o',
	startingCharacter: 'x',
	board: ['E','x','x',
					'o','o','x',
					'E','o','E']
};

AI.getAIAction = data=>{
	initialization.assignData(data, AI.Globals);
};



AI.getAIAction(AI.dataTemplate);
