import { useState } from 'react'
import PersonForm from './PersonForm';
import Persons from './Person';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '917624721' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const handleNumberChange= (event) => {
    setNewNumber(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  
  // updated addPerson also now include newNumber
  const addPerson = (event) => {
    event.preventDefault();
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
    const person = { name: newName, number: newNumber };
    setPersons(persons.concat(person));
    setNewName('');
    setNewNumber('');
    }
  };

  //find persons
  const filteredPersons = search 
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons;
  
  return (
        
      <div>
        <h2>
        Phonebook
        </h2>
        <Filter value={search} onChange={handleSearchChange}/>
        <h3>Add a new</h3>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          onNameChange={handleNameChange}
          onNumberChange={handleNumberChange}
          onSubmit={addPerson}
          />
        <h3>Number</h3>
        <Persons persons={filteredPersons} />
      </div>
  );
};

export default App
