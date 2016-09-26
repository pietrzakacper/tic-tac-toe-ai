const GameTools = (function() {

	function isTerminated(board) {
		return getStateOfGame(board) === 'not-end' ? false : true;
	}

	function getStateOfGame(board) {

		const supposedChampion = whichIfAnyPlayerWon(board);

		if (supposedChampion != 'none') {
			return supposedChampion + '-won';
		}

		if (isDraw(board)) {
			return 'draw';
		}

		return 'not-end';
	}

	function whichIfAnyPlayerWon(board) {
		const characters = ['x', 'o'];

		for (let i = 0; i < characters.length; ++i) {
			if (hasWon(characters[i], board)) {
				return characters[i];
			}
		}
		return 'none';
	}

	function isDraw(board) {
		for (let i = 0; i < board.length; ++i) {
			if (board[i] === 'e') {
				return false;
			}
		}
		return true;
	}

	function getGameScore(msg, aiCharacter, depth) {
		if (msg === aiCharacter + '-won') {
			return 10 - depth;
		} else if (msg === 'draw') {
			return 0;
		}
		return depth - 10;
	}

	function getAllMoves(board) {
		const possibleMoves = [];

		board.forEach(function(value, index) {
			if (value === 'e') {
				possibleMoves.push(index);
			}
		});

		return possibleMoves;
	}

	function hasWon(char, board) {

		if (isColumnWin(char, board) || isRowWin(char, board) || isDiagonalWin(char, board)) {
			return true;
		}

		return false;
	}

	function isColumnWin(char, board) {
		for (let i = 0; i < 3; ++i) {
			if (char === board[i] && char === board[i + 3] && char === board[i + 6]) {
				return true;
			}
		}
		return false;
	}

	function isRowWin(char, board) {
		for (let i = 0; i <= 6; i += 3) {
			if (char === board[i] && char === board[i + 1] && char === board[i + 2]) {
				return true;
			}
		}
		return false;
	}

	function isDiagonalWin(char, board) {
		return char === board[0] && char === board[4] && char == board[8] ||
						char === board[2] && char === board[4] && char == board[6];
	}

	function getBoardAfterSimulatedMove(board, pos, char) {
		const newBoard = board.slice();
		newBoard[pos] = char;
		return newBoard;
	}

	return {
		getStateOfGame: getStateOfGame,
		isTerminated: isTerminated,
		getGameScore: getGameScore,
		getAllMoves: getAllMoves,
		getBoardAfterSimulatedMove: getBoardAfterSimulatedMove
	};
})();

export default GameTools;
