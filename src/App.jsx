import { useState } from "react";

import GameBoard from "./components/GameBoard"
import Player from "./components/Player";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(){
    setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X");
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" isActive={activePlayer === "X"} symbol="X"/>
          <Player initialName="Player 2" isActive={activePlayer === "O"} symbol="O"/>
        </ol>
        <GameBoard activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare} />
      </div>
      GAME LOG
    </main>
  );
}

export default App
