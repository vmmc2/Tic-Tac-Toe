export default function GameBoard({ board, onSelectSquare }){
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, colIndex){
  //   setGameBoard((previousGameBoard) => {
  //     const updatedGameBoard = [...previousGameBoard.map(innerArray => [...innerArray])]; // Creating a deep copy of the previous game board.
  //     updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedGameBoard;
  //   });

  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => ( // Rendering each row of the game board.
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => ( // Rendering every cell of a row (every column of a row).
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}> {playerSymbol} </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}