# Tic Tac Toe AI
Simple library based on [Minimax](https://en.wikipedia.org/wiki/Minimax) algorithm that provides useful API in developing tic-tac-toe games.
### Features available:
* Best move based on current board state
* Board state after AI move
* Checking whether game is over
* Information about current game state

### Usage Examples:
Standard data format, used to exchange information about current game state.
Board property is one-dimensional array which consists of field characters: *[ 'x', 'o', 'e']*. **'e'** stands for empty field. 0th index of board array coresponds to left-top field, 1st index corresponds to center-top field and so on...
``` javascript
var data = {
  aiCharacter: 'o',
	playerCharacter: 'x',
	startingCharacter: 'x',
	board: ['e','e','o',
			'x','e','e',
			'e','x','e']
};
```
The most basic usage of this library is getting the best move, based on current board state. This can be achieved be simply calling ```getAIAction(data [, analyzeDepth = true])```. This function returns index of board array which reporesents AI's move.

``` javascript
AI.getAIAction(data); //returns 0;
```
In certain situations, more convenient thing to do, would be calling ```getBoardAfterAIMove(data [, analyzeDepth = true])``` . This function returns array
representing board state after AI movement;
``` javascript
AI.getBoardAfterAIMove(data);
//returns [ 'o', 'e', 'o',
//          'x', 'e', 'e',
//          'e', 'x', 'e' ]
```
Whenever it is needed to check  whether game is finished, ```isTerminated(board)``` can be called. This function returns  ***true*** or ***false***, depending on passed board state.
```javascript
AI.isTerminated(data.board); //returns false

var newBoard = ['x','e','o',
                'e','o','x',
                'o','x','o' ];

AI.isTerminated(newBoard); //returns true
```
Another way to check whether game is finished, is calling ```getStateOfGame(board)```. This time, more specific result is provided. This function can return one, out of four values: **'x-won'**, **'o-won'**, **'draw'** and **'not-end'**.
```javascript
var currentGameState = AI.getStateOfGame(data.board);
if(currentGameState === data.aiCharacter} + '-won'){
    //show 'YOU LOST!' on screen
}
```
For now, those are all of the features that can help you in developing your tic tac toe game.

## Instalation
If you want to use this library in browser environment, simply download minified script from [here](https://raw.githubusercontent.com/pietrzakacper/tic-tac-toe-ai/master/distribution/tic-tac-toe-ai-min.js) by clicking on link with **right mouse button** and choosing **Save link as...**, put it in your project's scripts folder and link it in your HTML file above your scripts. Now you can make use of every function mentioned above by calling them on globals object named **AI**, as shown in the examples.

## License

The project is licensed under [MIT license](https://opensource.org/licenses/MIT).
