var AI = (function() {
	var Globals = {};

	function getAIAction(data, analyzeDepth = true){
		if (!initialization(data, Globals)) {
			console.log('AI: Action cannot be returned: invalid data passed to function!');
			return;
		}
		return miniMax.calculateValue(Globals.board, Globals.aiCharacter, Globals.aiCharacter, analyzeDepth).move;
	}

	function getBoardAfterAIMove(data,analyzeDepth=true){
		if (!initialization(data, Globals)) {
			console.log('AI: Board cannot be returned: invalid data passed to function!');
			return;
		}
		return miniMax.calculateValue(Globals.board, Globals.aiCharacter, Globals.aiCharacter, analyzeDepth).board;
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
		return true;
	}

	var Validation = (function() {
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

			if (GameTools.isTerminate(board, true)) {
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

	var GameTools = (function() {
		var isTerminate = (board, onlyBoolean = false)=> {
			const chars = ['x', 'o'];
			for (let i = 0; i < 2; ++i) {
				if (hasWon(chars[i], board)) {
					if (onlyBoolean) {
						return true;
					}
					return `${chars[i]}-won`;
				}
			}

			for (let i = 0; i < 8; ++i) {
				if (board[i] === 'e') {
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

		var getGameScore=(msg, aiCharacter, depth)=> {
			if (msg === `${aiCharacter}-won`) {
				return 10 - depth;
			} else if (msg === 'draw') {
				return 0;
			}
			return depth - 10;
		};

		var getAllMoves = (board)=>{
			const possibleMoves = [];

			board.forEach((value, index) => {
				if (value === 'e') {
					possibleMoves.push(index);
				}
			});

			return possibleMoves;
		};

		var hasWon = (char, board) => {
			for (let i = 0; i < 3; ++i) {
				if (char === board[i] && char === board[i + 3] && char === board[i + 6]) {
					return true;
				}
			}

			for (let i = 0; i <= 6; i += 3) {
				if (char === board[i] && char === board[i + 1] && char === board[i + 2]) {
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

		var getBoardAfterSimulatedMove = (board, pos, char)=> {
			const newBoard = [];
			board.forEach((val) => {
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
	})();

	class Action{
		constructor(move){
			this.move = move;
			this.boardAfterMove = [];
			this.score = -1000;
		}
	}

	var miniMax = (function() {
		var calculateValue = (board, character, aiCharacter, analyzeDepth, depth = 0) => {
			const isTerminateMsg = GameTools.isTerminate(board);
			if (isTerminateMsg !== 'not-end') {
				const tmpAction = new Action(-1);
				tmpAction.score = GameTools.getGameScore(isTerminateMsg, aiCharacter, depth);
				return tmpAction;
			}
			const possibleMoves = GameTools.getAllMoves(board);
			const actions = [];
			possibleMoves.forEach(move => {
				const action = new Action(move);
				action.board = GameTools.getBoardAfterSimulatedMove(board, move, character);
				action.score = calculateValue(action.board, (character === 'x') ? 'o' : 'x', aiCharacter, analyzeDepth, (analyzeDepth) ? depth + 1 : 0).score;
				actions.push(action);
			});

			if (character === aiCharacter) {
				actions.sort(ACTION_ASCENDING);
			} else {
				actions.sort(ACTION_DESCENDING);
			}

			return actions[0];
		};

		var ACTION_ASCENDING = (a, b) => b.score - a.score;

		var ACTION_DESCENDING = (a, b) => a.score - b.score;

		return {
			calculateValue: calculateValue
		};
	})();

	return{
		getAIAction: getAIAction,
		isTerminate: function(board){
			return GameTools.isTerminate(board,true);
		},
		getStateOfGame: GameTools.isTerminate,
		getBoardAfterAIMove: getBoardAfterAIMove
	};
})();
