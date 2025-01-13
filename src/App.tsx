import { useState } from 'react'
import './App.css'

function App() {
  const [ToDos, setToDos] = useState([]);
  const [sortBy, setSortBy] = useState("all");

  const addToDo = (listName, listOwner) => {
    const newToDo = {
      id: Date.now(),
      title: listName,
      listOwner: listOwner
    };
    setToDos([...ToDos, newToDo]);
  };

  const removeToDo = (id) => {
    setToDos(ToDos.filter(ToDo => ToDo.id !== id));
  };

  const uniqueOwners = [...new Set(ToDos.map(ToDo => ToDo.listOwner))];
  
  let filteredToDos;
  if (sortBy === "all") {
    filteredToDos = ToDos;
  } else {
    filteredToDos = ToDos.filter(ToDo => ToDo.listOwner === sortBy);
  }
  return (
    <div className="App">
      <ToDoInput onAdd={addToDo} />
      <div style={{ padding: "20px"}}>
        <label>
          Filter by owner:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="all">All owners</option>
            {uniqueOwners.map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>
        </label>
      </div>
      <ToDoList ToDos={filteredToDos} onRemove={removeToDo} />
    </div>
  );
}
function ToDoInput({ onAdd }) {
  const ToDoInputContainerStyle = {
    padding: "20px",
  };
  const [listName, setListName] = useState("");
  const [listOwner, setListOwner] = useState("");

  const handleSubmit = () => {
    if (listName && listOwner) {
      onAdd(listName, listOwner);
      setListName("");
      setListOwner("");
    }
  };

  return (
    <div style={ToDoInputContainerStyle}>
      <label htmlFor="listOwner">
        Username:
        <input id="listOwner" onChange={(e) => setListOwner(e.target.value)} value={listOwner} />
      </label>
      <label htmlFor='listName'>
        To Do Item:
        <input id="listName" onChange={(e) => setListName(e.target.value)} value={listName} />
      </label>
      <button onClick={handleSubmit}>Add To Do Item</button>
    </div>
  );
}

function ToDoList({ ToDos, onRemove }) {
  const ToDoListContainerStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  };

  return (
    <div style={ToDoListContainerStyle}>
      <h2>To Do List</h2>
      {ToDos.map((ToDo) => (
        <div key={ToDo.id}>
          <h3>{ToDo.title}</h3>
          <p>List Owner: {ToDo.listOwner}</p>
          <button onClick={() => onRemove(ToDo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App