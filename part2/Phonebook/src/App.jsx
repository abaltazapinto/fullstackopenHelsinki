import { useState } from 'react'
import './App.css'

function App() {
  const [persons, setPersons] = useState([{ name: 'arthur', number: '917624721'  }]);
  const [newName, setNewName] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if(persons.name.some(person => person.name === newName)) {
      alert('${newName} is already added to phonebook');
    } else {
    const person = { name: newName };
    setPersons(persons.concat(person));
    setNewName('');
    }
  };

  return (
        
      <div>
        <h2>
        Phonebook
        </h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
            <button type="submit">add</button>
          </div>
        </form>
      <h2>Numbers</h2>
      number: <input value={newName}/>
      <hr/>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  );
};

export default App