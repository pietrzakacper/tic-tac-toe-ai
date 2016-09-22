var AI = (function(module){
module.Validation = (function() {
		var aiCharacter = character => {
			if (typeof character === 'undefined') {
				console.log('AI ERROR: ai character is undefined!');
				return false;
			}

			character = character.toLowerCase();

			if (character !== 'x' && character !== 'o') {
				console.log(`AI ERROR: '${character}' is not valid ai character!`);
				return false;
			}
			return character;
		};

		var playerCharacter = (character, aiCharacter) => {
			if (typeof character === 'undefined') {
				console.log('AI ERROR: player character is undefined!');
				return false;
			}

			character = character.toLowerCase();

			if (character !== 'x' && character !== 'o') {
				console.log(`AI ERROR: '${character}' is not valid player character!`);
				return false;
			}
			if (character === aiCharacter) {
				console.log(`AI ERROR: Player character '${character}' cannot be the same as ai character '${aiCharacter}' !`);
				return false;
			}
			return character;
		};

		var startingCharacter = character => {
			if (typeof character === 'undefined') {
				console.log('AI ERROR: starting character is undefined!');
				return false;
			}

			character = character.toLowerCase();

			if (character !== 'x' && character !== 'o') {
				console.log(`AI ERROR: '${character}' is not valid starting character!`);
				return false;
			}
			return character;
		};

		var board = (board, startingCharacter, aiCharacter) => {
			if (typeof board === 'undefined') {
				console.log('AI ERROR: board is not defined');
				return false;
			}

			if (!Array.isArray(board)) {
				console.log('AI ERROR: passed board argument is not type of array');
				return false;
			}

			if (board.length !== 9) {
				console.log(`AI ERROR: length of board array is not valid, expected value is 9, given value is ${board.length}`);
				return false;
			}

			board.forEach((value, index) => {
				board[index] = value.toLowerCase();
			});

			if (containsInvalidCharacters(board)) {
				console.log('AI ERROR: board array contains invalid character !');
				return false;
			}
			const aiMoves = countOccurences(board, aiCharacter);
			const playerMoves = countOccurences(board, (aiCharacter === 'o') ? 'x' : 'o');

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

			if (module.GameTools.isTerminated(board, true)) {
				console.log('AI ERROR: Given board represents terminated game!');
				return false;
			}

			return board;
		};

		var containsInvalidCharacters = (board) => {
			let contains = false;

			board.forEach((value) => {
				if (value !== 'e' && value !== 'x' && value !== 'o') {
					contains = true;
				}
			});

			return contains;
		};

		var countOccurences = (board, character) => {
			return board.reduce((previousValue, currentValue) => {
				if (currentValue === character) {
					return ++previousValue;
				}
				return previousValue;
			}, 0);
		};

		return {
			aiCharacter:aiCharacter,
			playerCharacter:playerCharacter,
			startingCharacter:startingCharacter,
			board: board
		};

	})();
	return module;
})(AI || {});