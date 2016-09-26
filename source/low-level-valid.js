import {isTerminated} from './game';

function validBeingInvalidCharacter(character, nameForError) {
	if (character !== 'x' && character !== 'o') {
		throw new Error('AI ERROR: ' + character + ' is not valid ' + nameForError + ' character!');
	}
}

function validCharactersBeingSame(playerCharacter, aiCharacter) {
	if (playerCharacter === aiCharacter) {
		throw new Error('AI ERROR: Player character ' + character + ' cannot be the same as ai character ' + aiCharacter + '!');
	}
}

function validBoardStructure(board) {
	if (!Array.isArray(board)) {
		throw new Error('AI ERROR: passed board argument is not type of array');
	}

	if (board.length !== 9) {
		throw new Error('AI ERROR: length of board array is not valid, expected value is 9, given value\'s length is ' + board.length);
	}
}

function validBoardGameState(board, aiCharacter, startingCharacter) {
	const aiMoves = countOccurences(board, aiCharacter);
	const playerMoves = countOccurences(board, (aiCharacter === 'o') ? 'x' : 'o');

	if (aiMoves > playerMoves || (aiMoves === playerMoves && startingCharacter !== aiCharacter)) {
		throw new Error('AI ERROR: It is not ai\'s turn!');
	}
	if (playerMoves > aiMoves && startingCharacter === aiCharacter) {
		throw new Error('AI ERROR: Given board contains too few ai\' moves');
	}
	if (playerMoves - 1 > aiMoves) {
		throw new Error('AI ERROR: Given board contains too few player\' moves');
	}

	if (isTerminated(board)) {
		throw new Error('AI ERROR: Given board represents terminated game!');
	}

}

function validInvalidCharactersPresenceOnBoard(board) {
	board.forEach(function(value) {
		if (value !== 'e' && value !== 'x' && value !== 'o') {
			throw new Error('AI ERROR: board array contains invalid character !');
		}
	});
}

function countOccurences(board, character) {
	return board.reduce(function(previousValue, currentValue) {
		return currentValue === character ? previousValue + 1 : previousValue;
	}, 0);
}

function getLowerCasedArray(arr) {
	const resultArray = [];
	arr.forEach(function(value) {
		resultArray.push(value.toLowerCase());
	});

	return resultArray;
}

export {
	validBoardStructure,
	validCharactersBeingSame,
	validBoardGameState,
	validBeingInvalidCharacter,
	validInvalidCharactersPresenceOnBoard,
	getLowerCasedArray,
};
