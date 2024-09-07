import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./PersonForm";
import Persons from "./Person";
import Filter from "./Filter";

const baseUrl = "http://localhost:3004/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

  // Fetching data from the server
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        console.log(response.data);
        setPersons(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const showNotification = ({ message, type = "success" }) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  // updated addPerson also now include newNumber
  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      showNotification({
        type: "error",
        message: `${newName} is already added to phonebook`,
      });
    } else {
      const newPerson = { name: newName, number: newNumber };
      showNotification({
        type: "success",
        message: `${newName} added to phonebook`,
      });
      // erro: const person = { name: newName, number: newNumber };
      axios
        .post(baseUrl, newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          console.log("Person registered in the server");
        })
        .catch((error) => {
          console.error("Error adding person", error);
          showNotification({
            type: "error",
            message: `Error adding ${newName}`,
          });
        });
    }
  };

  //Delete a person
  const deletePerson = (id, name) => {
    //find the person
    // Primeiro, encontre a pessoa usando o ID fornecido para obter o nome para as notificações.
    const person = persons.find((p) => p.id === id);

    const confirmDelete = window.confirm(
      "Are you sure you want delete this person?",
    );

    if (confirmDelete) {
      axios
        .delete(`${baseUrl}/${id}`)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification({
            type: "success",
            message: `${person.name} deleted successfully`,
          });
        })
        .catch((error) => console.error("Error deleting person", error));

      showNotification({
        type: "error",
        message: `Information of ${person.name} was already deleted by another user`,
      });
    }
  };
  //find persons
  const filteredPersons = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase()),
      )
    : persons;
  //notification iniatialization

  return (
    <div>
      <h2>Phonebook</h2>

      {console.log(notification?.type)}
      {console.log(notification)}
      {notification && (
        <div
          className={`notification ${notification.type === "success" ? "success" : "error"}`}
        >
          {notification?.message}
        </div>
      )}
      <Filter value={search} onChange={handleSearchChange} />
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

export default App;
