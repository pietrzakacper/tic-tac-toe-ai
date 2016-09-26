import {
	validBoardStructure,
	validCharactersBeingSame,
	validBoardGameState,
	validBeingInvalidCharacter,
	validInvalidCharactersPresenceOnBoard,
	getLowerCasedArray,
} from './low-level-valid';

function gameCharacter(character, nameForError) {
	character = character.toLowerCase();

	validBeingInvalidCharacter(character, nameForError);

	return character;
}

function playerCharacter(character, aiCharacter) {
	const afterValid = gameCharacter(character, 'ai');

	validCharactersBeingSame(playerCharacter, aiCharacter);

	return afterValid;
}

function board(board, startingCharacter, aiCharacter) {

	validBoardStructure(board);

	const boardWithValidatedStructure = getLowerCasedArray(board);

	validInvalidCharactersPresenceOnBoard(boardWithValidatedStructure);

	validBoardGameState(boardWithValidatedStructure, aiCharacter, startingCharacter);

	return board;
}

export default {
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
