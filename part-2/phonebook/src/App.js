import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'
import './index.css'
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notifType, setNotifType] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const updateNumber = (id, newNumber) => {
    const person = persons.find(person => person.id === id)
    const updatedPerson = {...person, number: newNumber}
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNotifType("success")
        setMessage(`Updated ${person.name}'s number`)
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        if (error.response) {
          // Handles errors with responses, like validation errors
          console.error(error);
          setNotifType("error");
          setMessage(error.response.data.error);
          setNewName("");
          setNewNumber("");
        } else {
          // Handles other types of errors (e.g., network errors)
          console.error(error);
          setNotifType("error");
          setMessage(`Information of ${person.name} has already been removed from the server`);
          setPersons(persons.filter(p => p.id !== id));
        }
      });
  }
};

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) => person.name.trim() === personObject.name.trim()
    );

    if (existingPerson) {
      // alert(`${newName} is already added to phonebook`);
      updateNumber(existingPerson.id, newNumber);
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        //setPersons(persons.concat(personObject));
        setPersons([...persons, returnedPerson]);
        setNotifType("success")
        setMessage(`Added ${returnedPerson.name}`)
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        console.error(error)
        setNotifType("error")
        setMessage(error.response.data.error)
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id, name) => {
    // const clickedPerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(() => {
        const updatedPersons = persons.filter(person => person.id !== id)
        setPersons(updatedPersons)
      })
      .catch(error => {
        console.error('Erro ao excluir:', error);
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} setMessage={setMessage} notifType={notifType} setNotifType={setNotifType}/>
      <Filter value={nameFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameInputValue={newName}
        numberInputValue={newNumber}
        nameOnChange={handleNameChange}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
