const initialGameBoard = [ // The game board is represented as a list whose elements are also lists that always have 3 elements.
  [null, null, null], // row
  [null, null, null], // row
  [null, null, null], // row
];

export default function GameBoard(){
  return (
    <ol id="game-board">
      {initialGameBoard.map((row, rowIndex) => ( // Rendering each row of the game board.
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => ( // Rendering every cell of a row (every column of a row).
              <li key={colIndex}>
                <button> {playerSymbol} </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}