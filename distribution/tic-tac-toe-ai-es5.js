'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AI = function () {
	var Globals = {};

	function getAIAction(data) {
		var analyzeDepth = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

		if (!initialization(data, Globals)) {
			console.log('AI: ai action cannot be returned: invalid data passed to function!');
			return;
		}
		return miniMax.calculateValue(Globals.board, Globals.aiCharacter, Globals.aiCharacter, analyzeDepth).move;
	}

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
		console.log('AI: Initialization succed!');
		return true;
	}

	var Validation = function () {
		var aiCharacter = function aiCharacter(character) {
			if (typeof character === 'undefined') {
				console.log('AI ERROR: ai character is undefined!');
				return false;
			}

			character = character.toLowerCase();

			if (character !== 'x' && character !== 'o') {
				console.log('AI ERROR: \'' + character + '\' is not valid ai character!');
				return false;
			}
			return character;
		};

		var playerCharacter = function playerCharacter(character, aiCharacter) {
			if (typeof character === 'undefined') {
				console.log('AI ERROR: player character is undefined!');
				return false;
			}

			character = character.toLowerCase();

			if (character !== 'x' && character !== 'o') {
				console.log('AI ERROR: \'' + character + '\' is not valid player character!');
				return false;
			}
			if (character === aiCharacter) {
				console.log('AI ERROR: Player character \'' + character + '\' cannot be the same as ai character \'' + aiCharacter + '\' !');
				return false;
			}
			return character;
		};

		var startingCharacter = function startingCharacter(character) {
			if (typeof character === 'undefined') {
				console.log('AI ERROR: starting character is undefined!');
				return false;
			}

			character = character.toLowerCase();

			if (character !== 'x' && character !== 'o') {
				console.log('AI ERROR: \'' + character + '\' is not valid starting character!');
				return false;
			}
			return character;
		};

		var board = function board(_board, startingCharacter, aiCharacter) {
			if (typeof _board === 'undefined') {
				console.log('AI ERROR: board is not defined');
				return false;
			}

			if (!Array.isArray(_board)) {
				console.log('AI ERROR: passed board argument is not type of array');
				return false;
			}

			if (_board.length !== 9) {
				console.log('AI ERROR: length of board array is not valid, expected value is 9, given value is ' + _board.length);
				return false;
			}

			_board.forEach(function (value, index) {
				_board[index] = value.toLowerCase();
			});

			if (containsInvalidCharacters(_board)) {
				console.log('AI ERROR: board array contains invalid character !');
				return false;
			}
			var aiMoves = countOccurences(_board, aiCharacter);
			var playerMoves = countOccurences(_board, aiCharacter === 'o' ? 'x' : 'o');

			if (aiMoves > playerMoves || aiMoves === playerMoves && startingCharacter !== aiCharacter) {
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

			if (GameTools.isTerminate(_board, true)) {
				console.log('AI ERROR: Given board represents terminated game!');
				return false;
			}

			return _board;
		};

		var containsInvalidCharacters = function containsInvalidCharacters(board) {
			var contains = false;

			board.forEach(function (value) {
				if (value !== 'e' && value !== 'x' && value !== 'o') {
					contains = true;
				}
			});

			return contains;
		};

		var countOccurences = function countOccurences(board, character) {
			return board.reduce(function (previousValue, currentValue) {
				if (currentValue === character) {
					return ++previousValue;
				}
				return previousValue;
			}, 0);
		};

		return {
			aiCharacter: aiCharacter,
			playerCharacter: playerCharacter,
			startingCharacter: startingCharacter,
			board: board
		};
	}();

	var GameTools = function () {
		var isTerminate = function isTerminate(board) {
			var onlyBoolean = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			var chars = ['x', 'o'];
			for (var i = 0; i < 2; ++i) {
				if (hasWon(chars[i], board)) {
					if (onlyBoolean) {
						return true;
					}
					return chars[i] + '-won';
				}
			}

			for (var _i = 0; _i < 8; ++_i) {
				if (board[_i] === 'e') {
					if (onlyBoolean) {
						return false;
					}
					return 'not-end';
				}
			}
			if (onlyBoolean) {
				return true;
			}
			return 'draw';
		};

		var getGameScore = function getGameScore(msg, aiCharacter, depth) {
			if (msg === aiCharacter + '-won') {
				return 10 - depth;
			} else if (msg === 'draw') {
				return 0;
			}
			return depth - 10;
		};

		var getAllMoves = function getAllMoves(board) {
			var possibleMoves = [];

			board.forEach(function (value, index) {
				if (value === 'e') {
					possibleMoves.push(index);
				}
			});

			return possibleMoves;
		};

		var hasWon = function hasWon(char, board) {
			for (var i = 0; i < 3; ++i) {
				if (char === board[i] && char === board[i + 3] && char === board[i + 6]) {
					return true;
				}
			}

			for (var _i2 = 0; _i2 <= 6; _i2 += 3) {
				if (char === board[_i2] && char === board[_i2 + 1] && char === board[_i2 + 2]) {
					return true;
				}
			}

			if (char === board[0] && char === board[4] && char == board[8]) {
				return true;
			}
			if (char === board[2] && char === board[4] && char == board[6]) {
				return true;
			}
			return false;
		};

		var getBoardAfterSimulatedMove = function getBoardAfterSimulatedMove(board, pos, char) {
			var newBoard = [];
			board.forEach(function (val) {
				newBoard.push(val);
			});

			newBoard[pos] = char;
			return newBoard;
		};

		return {
			isTerminate: isTerminate,
			getGameScore: getGameScore,
			getAllMoves: getAllMoves,
			getBoardAfterSimulatedMove: getBoardAfterSimulatedMove
		};
	}();

	var Action = function Action(move) {
		_classCallCheck(this, Action);

		this.move = move;
		this.boardAfterMove = [];
		this.score = -1000;
	};

	var miniMax = function () {
		var calculateValue = function calculateValue(board, character, aiCharacter, analyzeDepth) {
			var depth = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

			var isTerminateMsg = GameTools.isTerminate(board);
			if (isTerminateMsg !== 'not-end') {
				var tmpAction = new Action(-1);
				tmpAction.score = GameTools.getGameScore(isTerminateMsg, aiCharacter, depth);
				return tmpAction;
			}
			var possibleMoves = GameTools.getAllMoves(board);
			var actions = [];
			possibleMoves.forEach(function (move) {
				var action = new Action(move);
				action.board = GameTools.getBoardAfterSimulatedMove(board, move, character);
				action.score = calculateValue(action.board, character === 'x' ? 'o' : 'x', aiCharacter, analyzeDepth, analyzeDepth ? depth + 1 : 0).score;
				actions.push(action);
			});

			if (character === aiCharacter) {
				actions.sort(ACTION_ASCENDING);
			} else {
				actions.sort(ACTION_DESCENDING);
			}

			return actions[0];
		};

		var ACTION_ASCENDING = function ACTION_ASCENDING(a, b) {
			return b.score - a.score;
		};

		var ACTION_DESCENDING = function ACTION_DESCENDING(a, b) {
			return a.score - b.score;
		};

		return {
			calculateValue: calculateValue
		};
	}();

	return {
		getAIAction: getAIAction
	};
}();
