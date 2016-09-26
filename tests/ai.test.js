var test = require('tape').test;
var AI = require('../source/ai.js').AI;

test('The getAIMove method', function(t) {
	var data = {
		aiCharacter: 'x',
		playerCharacter: 'o',
		startingCharacter: 'x',
		board: ['e', 'o', 'o',
			'e', 'e', 'e',
			'e', 'x', 'x'
		]
	};

	var actual = AI.getAIMove(data);
	var expected = 6;
	t.equal(actual, expected, 'should choose finishing move over blocking move');

	data = {
		aiCharacter: 'o',
		playerCharacter: 'x',
		startingCharacter: 'x',
		board: ['x', 'e', 'e',
			'e', 'e', 'e',
			'e', 'e', 'e'
		]
	};

	actual = AI.getAIMove(data);
	expected = 4;

	t.equal(actual, expected, 'should move to center when player moves in the corner');

	data = {
		aiCharacter: 'o',
		playerCharacter: 'x',
		startingCharacter: 'x',
		board: ['e', 'e', 'e',
			'e', 'o', 'e',
			'x', 'x', 'e'
		]
	};

	actual = AI.getAIMove(data);
	expected = 8;

	t.equal(actual, expected, 'should block player moves');

	data = {
		aiCharacter: 'x',
		playerCharacter: 'x',
		startingCharacter: 'x',
		board: ['e', 'e', 'e',
			'e', 'o', 'e',
			'x', 'x', 'e'
		]
	};

	t.throws(function() {
		AI.getAIMove(data);
	}, 'should throw an error for same ai and player characters');

	data = {
		aiCharacter: 'x',
		playerCharacter: 'o',
		startingCharacter: 'x',
		board: ['e', 'e', 'e',
			'e', 'o', 'e',
			'x', 'x', 'e'
		]
	};

	t.throws(function() {
		AI.getAIMove(data);
	}, 'should throw an error when it is not AI\'s turn');


	t.end();
});


test('The getBoardAfterAIMove method', function(t) {
	var data = {
		aiCharacter: 'x',
		playerCharacter: 'o',
		startingCharacter: 'x',
		board: ['e', 'o', 'o',
			'e', 'e', 'e',
			'e', 'x', 'x'
		]
	};

	var actual = Array.isArray(AI.getBoardAfterAIMove(data));
	var expected = true;

	t.equal(actual, expected, 'should return Array');

	data = {
		aiCharacter: 'x',
		playerCharacter: 'o',
		startingCharacter: 'x',
		board: ['e', 'e', 'e',
			'e', 'e', 'e',
			'e', 'e', 'e'
		]
	};

	actual = AI.getBoardAfterAIMove(data)[0];
	expected = data.aiCharacter;

	t.equal(actual, expected, 'should return board with ai\' character on 0th position, given empty board');

	data = {
		aiCharacter: 'x',
		playerCharacter: 'o',
		startingCharacter: 'x',
		board: ['e', 'e', 'e',
			'e', 'o', 'e',
			'x', 'x', 'e'
		]
	};

	t.throws(function() {
		AI.getBoardAfterAIMove(data);
	}, 'should throw an error when it is not AI\'s turn');


	t.end();
});
