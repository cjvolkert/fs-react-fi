import { useState, useEffect } from "react";

import phoneservice from "./services/numbers";

const Entry = ({ phoneNumber, remove }) => {
  return (
    <li>
      {phoneNumber.name} {phoneNumber.phone}
      <button onClick={() => remove(phoneNumber)}>delete</button>
    </li>
  );
};
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phoneservice.getAll().then((d) => setPersons(d));
  }, []);

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

  const remove = (phone) => {
    if (window.confirm("delete?")) {
      phoneservice.remove(phone.id);
      setPersons(persons.filter((p) => p.id !== phone.id));

      setMessage(`removed ${phone.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const addName = (event) => {
    event.preventDefault();

    const contained = persons.find((e) => e.name === newName);
    if (contained) {
      alert(`contained: ${newName}`);
      return;
    }

    phoneservice
      .add({
        name: newName,
        phone: phoneNumber,
      })
      .then((newPhoneNumber) => {
        setPersons([newPhoneNumber].concat(persons));
        setNewName("");
        setPhoneNumber("");

        setMessage(`added ${newPhoneNumber.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage(`Note ${error}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  return (
    <div>
      <div>debug: {newName}</div>
      <Notification message={message} />
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
          <Entry key={p.id} phoneNumber={p} remove={remove} />
          // <li key={p.name}>
          //   {p.name} {p.phone}
          //   <button onClick={() => remove(p)}>delete</button>
          // </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
