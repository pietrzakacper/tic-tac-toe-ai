var AI = (function(module) {
	module.Validation = (function() {

		function gameCharacter(character, name) {
			character = character.toLowerCase();

			if (character !== 'x' && character !== 'o') {
				console.log('AI ERROR: ' + character + ' is not valid ' + name + ' character!');
				return false;
			}
			return character;
		}

		function playerCharacter(character, aiCharacter) {
			var afterValid = gameCharacter(character, 'ai');

			if (afterValid === aiCharacter) {
				console.log('AI ERROR: Player character' + character + ' cannot be the same as ai character ' + aiCharacter + '!');
				return false;
			}
			return afterValid;
		}

		function board(board, startingCharacter, aiCharacter) {
			if (!Array.isArray(board)) {
				console.log('AI ERROR: passed board argument is not type of array');
				return false;
			}

			if (board.length !== 9) {
				console.log('AI ERROR: length of board array is not valid, expected value is 9, given value\'s length is ' + board.length);
				return false;
			}

			board.forEach(function(value, index) {
				board[index] = value.toLowerCase();
			});

			if (containsInvalidCharacters(board)) {
				console.log('AI ERROR: board array contains invalid character !');
				return false;
			}
			var aiMoves = countOccurences(board, aiCharacter);
			var playerMoves = countOccurences(board, (aiCharacter === 'o') ? 'x' : 'o');

			if (aiMoves > playerMoves || (aiMoves === playerMoves && startingCharacter !== aiCharacter)) {
				console.log('AI ERROR: It is not ai\'s turn!');
				return false;
			}
			if (playerMoves > aiMoves && startingCharacter === aiCharacter) {
				console.log('AI ERROR: Given board contains too few ai\' moves');
				return false;
			}
			if (playerMoves - 1 > aiMoves) {
				console.log('AI ERROR: Given board contains too few player\' moves');
				return false;
			}

			if (module.GameTools.isTerminated(board)) {
				console.log('AI ERROR: Given board represents terminated game!');
				return false;
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
	return module;
})(AI || {});
