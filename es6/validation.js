
exports.aiCharacter = character=>{
	if(typeof character === 'undefined'){
		console.log('AI ERROR: ai character is undefined!');
		return false;
	}

	character = character.toLowerCase();

	if(character!== 'x' && character !== 'o'){
		console.log(`AI ERROR: '${character}' is not valid ai character!`);
		return false;
	}
	return character;
};

exports.playerCharacter = (character, aiCharacter)=>{
	if(typeof character === 'undefined'){
		console.log('AI ERROR: player character is undefined!');
		return false;
	}

	character = character.toLowerCase();

	if(character!== 'x' && character !== 'o'){
		console.log(`AI ERROR: '${character}' is not valid player character!`);
		return false;
	}
	if(character===	aiCharacter){
		console.log(`AI ERROR: Player character '${character}' cannot be the same as ai character '${aiCharacter}' !`);
		return false;
	}
	return character;
};

exports.board = (board, startingCharacter, aiCharacter)=>{
	if(typeof board === 'undefined'){
		console.log('AI ERROR: board is not defined');
		return false;
	}

	if(!Array.isArray(board)){
		console.log('AI ERROR: passed board argument is not type of array');
		return false;
	}

	if(board.length !== 9){
		console.log(`AI ERROR: length of board array is not valid, expected value is 9, given value is ${board.length}`);
		return false;
	}

	board.forEach((value,index)=>{
		board[index]=value.toLowerCase();
	});

	if(containsInvalidCharacters(board)){
		console.log('AI ERROR: board array contains invalid character !');
		return false;
	}
	const aiMoves = countOccurences(board,aiCharacter);
	const playerMoves = countOccurences(board, (aiCharacter==='o')?'x':'o');

	if(aiMoves > playerMoves || (aiMoves === playerMoves && startingCharacter !== aiCharacter)){
		console.log('AI ERROR: It is not ai\'s turn!');
		return false;
	}

	if(playerMoves < aiMoves-1){
		console.log('AI ERROR: Given board contains too few player\' moves');
		return false;
	}

	if(isTerminate(board)){
		console.log('AI ERROR: Given board represents terminated game!');
		return false;
	}

	return board;
};

function containsInvalidCharacters(board){
	let contains = false;

	board.forEach((value)=>{
		if(value !== 'e' && value !== 'x' && value!=='o'){
			contains = true;
		}
	});

	return contains;
}

function countOccurences(board,character){
	return board.reduce((previousValue,currentValue)=>{
		if(currentValue === character){
			return ++previousValue;
		}
		return previousValue;
	}, 0);
}
