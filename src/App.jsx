import { useState } from "react";

import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver.jsx";
import Log from "./components/Log";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations.js"

const INITIAL_GAME_BOARD = [ // The game board is represented as a list whose elements are also lists that always have 3 elements.
  [null, null, null], // row
  [null, null, null], // row
  [null, null, null], // row
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X"; // We assume that we are in an odd turn.
  if(gameTurns.length > 0 && gameTurns[0].player == "X"){ // Make a check to see if its necessary to change the value of "currentPlayer".
    currentPlayer = "O";
  }

    return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])]; // This approach we followed here is called derived state from props. We are basically calculating a derived state from the value of the props we have received.

  for(const turn of gameTurns){ // The followed order to fill the squares of the game board does not matter.
    const {player, square} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player; // Here we are populating the game board with information from the previous turns.
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner = null;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){ // The first condition is necessary because we don't want to start checking squares whose value are null.
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = (gameTurns.length === 9 && !winner);

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  function handleRematch(){
    setGameTurns([]);
  }

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          player: currentPlayer, // We could use "activePlayer" here. However, this is a bad idea because we would be merging different states and by doing this, we have no guarantee that "activePlayer" here is, indeed, the player that is about to make a move on the current turn.
          square: {
            row: rowIndex,
            col: colIndex,
          }
        },
        ...prevTurns
      ]; // The latest turn info will be displayed first in this list.

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} symbol="X"/>
          <Player initialName={PLAYERS.O} isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} symbol="O"/>
        </ol>
        {(winner || hasDraw) && <GameOver onRematch={handleRematch} winner={winner}/>}
        <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
