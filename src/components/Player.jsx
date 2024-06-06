import { useState } from "react";

export default function Player({initialName, isActive, symbol}){
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick(){
    setIsEditing((isEditing) => !isEditing); // Always working with the latest updated state of this component.
  }

  function handleTextChange(event){
    setPlayerName(event.target.value); // This state update does not depend on a previous state. Thus, there's no need to pass a function to this state-update function.
  }
  
  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {isEditing ? <input type="text" required value={playerName} onChange={handleTextChange} /> : <span className="player-name"> {playerName} </span>}
        <span className="player-symbol"> {symbol} </span>
      </span>
      <button onClick={handleEditClick}> {isEditing ? "Save" : "Edit"} </button>
    </li>
  );
}