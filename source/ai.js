import init from './init';
import minimax from './minimax';
import {isTerminated,getStateOfGame} from './game';


function getAIAction(data) {
	const checkedData = {};

	init(data, checkedData);

	return minimax(checkedData.board, checkedData.aiCharacter, checkedData.aiCharacter, 0);
}


export default {
	getAIMove: function(data) {
		return (getAIAction(data)).move;
	},
	getBoardAfterAIMove: function(data) {
		return (getAIAction(data)).board;
	},
	isTerminated: isTerminated,
	getStateOfGame: getStateOfGame
};
