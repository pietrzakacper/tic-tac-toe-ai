module.exports = (function() {

	function isTerminated(board) {
		return (getStateOfGame(board) === 'not-end') ? false : true;
	}

	function getStateOfGame(board) {
		var characters = ['x', 'o'];
		//check if one of players won
		for (var i = 0; i < 2; ++i) {
			if (hasWon(characters[i], board)) {
				return characters[i] + '-won';
			}
		}
		//check if there are stil empty fields left
		for (var i = 0; i < 9; ++i) {
			if (board[i] === 'e') {
				return 'not-end';
			}
		}
		//if not, it must be a draw
		return 'draw';
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
		var possibleMoves = [];

		board.forEach(function(value, index) {
			if (value === 'e') {
				possibleMoves.push(index);
			}
		});

		return possibleMoves;
	}

	function hasWon(char, board) {
		//check columns
		for (var i = 0; i < 3; ++i) {
			if (char === board[i] && char === board[i + 3] && char === board[i + 6]) {
				return true;
			}
		}

		//check rows
		for (var i = 0; i <= 6; i += 3) {
			if (char === board[i] && char === board[i + 1] && char === board[i + 2]) {
				return true;
			}
		}

		//check diagonals
		if ((char === board[0] && char === board[4] && char == board[8]) ||
			(char === board[2] && char === board[4] && char == board[6])) {
			return true;
		}

		return false;
	}

	function getBoardAfterSimulatedMove(board, pos, char) {
		var newBoard = board.slice();
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
