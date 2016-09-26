var tools = require('./game.js');
module.exports = (function() {

	function gameCharacter(character, name) {
		character = character.toLowerCase();

		if (character !== 'x' && character !== 'o') {
			throw new Error('AI ERROR: ' + character + ' is not valid ' + name + ' character!');
		}
		return character;
	}

	function playerCharacter(character, aiCharacter) {
		var afterValid = gameCharacter(character, 'ai');

		if (afterValid === aiCharacter) {
			throw new Error('AI ERROR: Player character ' + character + ' cannot be the same as ai character ' + aiCharacter + '!');
		}
		return afterValid;
	}

	function board(board, startingCharacter, aiCharacter) {
		if (!Array.isArray(board)) {
			throw new Error('AI ERROR: passed board argument is not type of array');
		}

		if (board.length !== 9) {
			throw new Error('AI ERROR: length of board array is not valid, expected value is 9, given value\'s length is ' + board.length);
		}

		board.forEach(function(value, index) {
			board[index] = value.toLowerCase();
		});

		if (containsInvalidCharacters(board)) {
			throw new Error('AI ERROR: board array contains invalid character !');
		}
		var aiMoves = countOccurences(board, aiCharacter);
		var playerMoves = countOccurences(board, (aiCharacter === 'o') ? 'x' : 'o');

		if (aiMoves > playerMoves || (aiMoves === playerMoves && startingCharacter !== aiCharacter)) {
			throw new Error('AI ERROR: It is not ai\'s turn!');
		}
		if (playerMoves > aiMoves && startingCharacter === aiCharacter) {
			throw new Error('AI ERROR: Given board contains too few ai\' moves');
		}
		if (playerMoves - 1 > aiMoves) {
			throw new Error('AI ERROR: Given board contains too few player\' moves');
		}

		if (tools.isTerminated(board)) {
			throw new Error('AI ERROR: Given board represents terminated game!');
		}

		return board;
	}

	function containsInvalidCharacters(board) {
		var contains = false;

		board.forEach(function(value) {
			if (value !== 'e' && value !== 'x' && value !== 'o') {
				contains = true;
			}
		});

		return contains;
	}

	function countOccurences(board, character) {
		return board.reduce(function(previousValue, currentValue) {
			return currentValue === character ? previousValue + 1 : previousValue;
		}, 0);
	}

	return {
		aiCharacter: function(data) {
			return gameCharacter(data.aiCharacter, 'ai');
		},
		playerCharacter: function(data) {
			return playerCharacter(data.playerCharacter, data.aiCharacter);
		},
		startingCharacter: function(data) {
			return gameCharacter(data.startingCharacter, 'starting');
		},
		board: function(data) {
			return board(data.board, data.startingCharacter, data.aiCharacter);
		}
	};

})();
