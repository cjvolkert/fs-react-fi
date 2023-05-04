import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "1423" },
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };
  const handleChange2 = (event) => {
    event.preventDefault();
    setPhoneNumber(event.target.value);
  };
  const handleChangeFilter = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const filteredEntries = () => {
    if (filter === "") {
      return persons;
    }
    return persons.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const addName = (event) => {
    event.preventDefault();
    const contained = persons.find((e) => e.name === newName);
    console.log(contained);
    if (contained) {
      alert(`contained: ${newName}`);
      return;
    }
    setPersons([{ name: newName, phone: phoneNumber }].concat(persons));
    setNewName("");
    setPhoneNumber("");
  };

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <div>
        filter: <input onChange={handleChangeFilter} value={filter} />
      </div>
      <form type="submit">
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          phoneNumber: <input onChange={handleChange2} value={phoneNumber} />
        </div>
        <div>
          <button type="submit" onClick={addName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredEntries().map((p) => (
          <li key={p.name}>
            {p.name} {p.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
