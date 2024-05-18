import { useEffect } from "react";

const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onSubmit }) => (
 
    
    <form onSubmit={onSubmit}>
      <div>name: <input value={newName} onChange={onNameChange} /></div>
      <div>number: <input value={newNumber} onChange={onNumberChange} /></div>
      <div><button className="addbutton" type="submit">ADD +</button></div>
      <div></div>
    </form>
    
  );

export default PersonForm;