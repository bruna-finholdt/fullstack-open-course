import React from "react";

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      <ul style={{ padding: 0 }}>
        {filteredPersons.map((person) => (
          <li style={{ listStyle: "none" }} key={person.id}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
