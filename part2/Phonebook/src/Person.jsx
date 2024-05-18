const Persons = ({ persons, onDeletePerson }) => {
    return (
        <ul>
        {persons.map(person => ( 
            <li key={person.id}>
                {person.name} {person.number}
                <button onClick={() => onDeletePerson(person.id)}>delete</button>
        </li>
        ))}
        </ul>
        );
};

export default Persons