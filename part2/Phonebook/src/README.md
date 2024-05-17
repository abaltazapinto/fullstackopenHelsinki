### Exercise 2.6: The Phonebook Step 1

You need to handle form input and add persons to the state when a new name is submitted. Here's how to modify your `App` component to include this functionality:

<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>jsx</span><div class="flex items-center"><span class="" data-state="closed"></span></div></div></div></pre>

<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="overflow-y-auto p-4 text-left undefined" dir="ltr"><code class="!whitespace-pre hljs language-jsx">import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = { name: newName };
    setPersons(persons.concat(person));
    setNewName('');
  };

  return (
    <span class="xml"><div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div></span>
  );
};

export default App;
</code></div></div></pre>

### Exercise 2.7: The Phonebook Step 2

You need to ensure that the names added to the phonebook are unique. Here's how you can modify the `addPerson` function to achieve this:

<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>jsx</span><div class="flex items-center"><span class="" data-state="closed"></span></div></div></div></pre>

<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="overflow-y-auto p-4 text-left undefined" dir="ltr"><code class="!whitespace-pre hljs language-jsx">const addPerson = (event) => {
  event.preventDefault();
  if (persons.some(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`);
  } else {
    const person = { name: newName };
    setPersons(persons.concat(person));
    setNewName('');
  }
};
</code></div></div></pre>

### Exercise 2.8: The Phonebook Step 3

You now need to include phone numbers. Update your component to handle an additional state for the phone number:

<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>jsx</span><div class="flex items-center"><span class="" data-state="closed"></span></div></div></div></pre>

<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="overflow-y-auto p-4 text-left undefined" dir="ltr"><code class="!whitespace-pre hljs language-jsx">const [newNumber, setNewNumber] = useState('');

const handleNumberChange = (event) => {
  setNewNumber(event.target.value);
};

// Updated addPerson also now includes newNumber
const addPerson = (event) => {
  event.preventDefault();
  if (persons.some(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`);
  } else {
    const person = { name: newName, number: newNumber };
    setPersons(persons.concat(person));
    setNewName('');
    setNewNumber('');
  }
};

// Include number input in the form
<span class="xml"><form onSubmit={addPerson}>
  <div>name: <input value={newName} onChange={handleNameChange} /></div>
  <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
  <div><button type="submit">add</button></div>
</form></span>
</code></div></div></pre>

### Exercise 2.9: The Phonebook Step 4

Implement a search feature that filters the displayed phonebook entries:

<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>jsx</span><div class="flex items-center"><span class="" data-state="closed"></span></div></div></div></pre>

<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="overflow-y-auto p-4 text-left undefined" dir="ltr"><code class="!whitespace-pre hljs language-jsx">const [search, setSearch] = useState('');

const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

const filteredPersons = search
  ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  : persons;

// Add the search input outside the form
<span class="xml"><input value={search} onChange={handleSearchChange} /></span>

// Use filteredPersons to render the list
{filteredPersons.map(person => <span class="xml"><div key={person.name}>{person.name} {person.number}</div></span>)}
</code></div></div></pre>

### Exercise 2.10: The Phonebook Step 5

Extract parts of your application into separate components. Create `Filter`, `PersonForm`, and `Persons` components, and use them in your `App` component:

<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>jsx</span><div class="flex items-center"><span class="" data-state="closed"></span></div></div></div></pre>

```jsx
// Filter.js
const Filter = ({ value, onChange }) => (
  <input value={value} onChange={onChange} />
);

// PersonForm.js
const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={newName} onChange={onNameChange} /></div>
    <div>number: <input value={newNumber} onChange={onNumberChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
);

// Persons.js
const Persons = ({ persons }) => (
  persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
);

// Updated App component using these new components
return (
  <div>
    <h2>Phonebook</h2>
    <Filter value={search} onChange={handleSearchChange} />
    <h3>Add a new</h3>
    <PersonForm
      newName={newName}
      newNumber={newNumber}
      onNameChange={handleNameChange}
      onNumberChange={handleNumberChange}
      onSubmit={addPerson}
    />
    <h3>Numbers</h3>
    <Persons persons={filteredPersons} />
  </div>
);
```
