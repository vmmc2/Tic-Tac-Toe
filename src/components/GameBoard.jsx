const initialGameBoard = [ // The game board is represented as a list whose elements are also lists that always have 3 elements.
  [null, null, null], // row
  [null, null, null], // row
  [null, null, null], // row
];

export default function GameBoard({ onSelectSquare, turns }){
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, colIndex){
  //   setGameBoard((previousGameBoard) => {
  //     const updatedGameBoard = [...previousGameBoard.map(innerArray => [...innerArray])]; // Creating a deep copy of the previous game board.
  //     updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedGameBoard;
  //   });

  //   onSelectSquare();
  // }

  let gameBoard = initialGameBoard; // This approach we followed here is called derived state from props. We are basically calculating a derived state from the value of the props we have received.

  for(const turn of turns){ // The followed order to fill the squares of the game board does not matter.
    const {player, square} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player; // Here we are populating the game board with information from the previous turns.
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => ( // Rendering each row of the game board.
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => ( // Rendering every cell of a row (every column of a row).
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}> {playerSymbol} </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}