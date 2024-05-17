import { useState, useEffect } from 'react'
import axios from 'axios';
import PersonForm from './PersonForm';
import Persons from './Person';
import Filter from './Filter';


const baseUrl = 'http://localhost:3005/persons';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '917624721' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  // Fetching data from the server
  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => 
      console.error('Error fetching data:', error));
  }, []);


  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  // updated addPerson also now include newNumber
  const addPerson = (event) => {
    event.preventDefault();
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
    const newPerson = { name: newName, number: newNumber };
    // erro: const person = { name: newName, number: newNumber };
    axios.post(baseUrl, newPerson)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
        console.log("Person registered in the server");
      })
      .catch(error => console.error('Error adding person', error));
    // setPersons(persons.concat(person));
    // setNewName('');
    // setNewNumber('');
    }
  };

//Delete a person 
const deletePerson = id => {
  const confirmDelete = window.confirm("Are you sure you want delete this person?");
  if (confirmDelete) {
    axios.delete(`${baseUrl}/${id}`)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(erros => console.error('Error deleting person', error));
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
        <Persons persons={filteredPersons} onDeletePerson={deletePerson} />
      </div>
  );
};

export default App
