export default function Log({ turns }){
  return (
    <ol id="log">
      {turns.map(turn => ( // Remember that when rendering a dynamic list of components, every component must have a "key" attribute.
        <li key={`${turn.square.row},${turn.square.col}`}> 
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}