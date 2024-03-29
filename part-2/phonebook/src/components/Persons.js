

const Persons = ({ filteredPersons, deletePerson }) => {

  return (
    <div>
      <ul style={{ padding: 0 }}>
        {filteredPersons.map((person) => (
          <li style={{ listStyle: "none", marginBottom: '10px' }} key={person.id}>
            {person.name} - {person.number}
            <button style={{marginLeft: '10px', borderRadius: '5px', fontWeight: 'bold'}} onClick={() => deletePerson(person.id, person.name)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
