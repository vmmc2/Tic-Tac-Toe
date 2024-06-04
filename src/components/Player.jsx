import { useState } from "react";

export default function Player({name, symbol}){
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick(){
    setIsEditing((isEditing) => !isEditing); // Always working with the latest updated state of this component.
  }
  
  return (
    <li>
      <span className="player">
        {isEditing ? <input type="text" required value={name} /> : <span className="player-name"> {name} </span>}
        <span className="player-symbol"> {symbol} </span>
      </span>
      <button onClick={handleEditClick}> {isEditing ? "Save" : "Edit"} </button>
    </li>
  );
}