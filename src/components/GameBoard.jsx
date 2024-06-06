import { useState } from 'react';

const initialGameBoard = [ // The game board is represented as a list whose elements are also lists that always have 3 elements.
  [null, null, null], // row
  [null, null, null], // row
  [null, null, null], // row
];

export default function GameBoard({ activePlayerSymbol, onSelectSquare }){
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex){
    setGameBoard((previousGameBoard) => {
      const updatedGameBoard = [...previousGameBoard.map(innerArray => [...innerArray])]; // Creating a deep copy of the previous game board.
      updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedGameBoard;
    });

    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => ( // Rendering each row of the game board.
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => ( // Rendering every cell of a row (every column of a row).
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}> {playerSymbol} </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}