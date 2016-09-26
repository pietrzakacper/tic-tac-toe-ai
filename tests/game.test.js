var test = require('tape').test;
var tools = require('../source/game.js');

test('The getStateOfGame method', function(t) {
	var board = ['e', 'e', 'e',
		'e', 'e', 'e',
		'e', 'e', 'e'
	];

	var actual = tools.getStateOfGame(board);
	var expected = 'not-end';

	t.equals(actual, expected, 'should return "not-end" for empty board');

	board = ['o', 'x', 'e',
		'e', 'o', 'x',
		'e', 'e', 'o'
	];

	actual = tools.getStateOfGame(board);
	expected = 'o-won';

	t.equals(actual, expected, 'should return "o-won" for three Os on diagonal');

	board = ['x', 'x', 'x',
		'e', 'o', 'e',
		'e', 'e', 'o'
	];

	actual = tools.getStateOfGame(board);
	expected = 'x-won';

	t.equals(actual, expected, 'should return "x-won" for three Xs in a row');

	board = ['x', 'o', 'o',
		'x', 'o', 'e',
		'x', 'e', 'o'
	];

	actual = tools.getStateOfGame(board);
	expected = 'x-won';

	t.equals(actual, expected, 'should return "x-won" for three Xs in one column');

	board = ['x', 'o', 'x',
		'x', 'o', 'o',
		'o', 'x', 'o'
	];

	actual = tools.getStateOfGame(board);
	expected = 'draw';

	t.equals(actual, expected, 'should return "draw" for filled board');

	t.end();
});
