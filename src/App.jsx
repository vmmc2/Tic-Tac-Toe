import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex){
    setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X");
    setGameTurns((prevTurns) => {
      let currentPlayer = "X"; // We assume that we are in an odd turn.

      if(prevTurns.length > 0 && prevTurns[0].player === "X"){ // Make a check to see if its necessary to change the value of "currentPlayer".
        currentPlayer = "O";
      }

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
          <Player initialName="Player 1" isActive={activePlayer === "X"} symbol="X"/>
          <Player initialName="Player 2" isActive={activePlayer === "O"} symbol="O"/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
