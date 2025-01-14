import { useState } from 'react'
import './App.css'
import Button from '@mui/material/Button';

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
      <Button onClick={handleSubmit}variant="contained" 
  sx={{ 
    backgroundColor: '#ff4da3', 
    '&:hover': { backgroundColor: '#ff1a8c' }
  }}
  size="small"
>Add To Do Item</Button>
    </div>
  );
}

function ToDoList({ ToDos, onRemove }) {
  const ToDoListContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    border: "2px solid #ff1a8c",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    maxHeight: "400px",
    overflowY: "auto",
    width: '100%',
    boxSizing: 'border-box',
  };

  const todoItemStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ced4da",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "white",
    boxSizing: 'border-box',
    minWidth: 0,
  };

  const textStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: '10px',
  };

  return (
    <div style={ToDoListContainerStyle}>
      <h2>To Do List</h2>
      {ToDos.map((ToDo) => (
        <div key={ToDo.id} style={todoItemStyle}>
          <span>List Owner: {ToDo.listOwner}</span>
          <span>{ToDo.title}</span>
          <Button 
  onClick={() => onRemove(ToDo.id)} 
  variant="contained" 
  sx={{
    backgroundColor: '#ff4da3', '&:hover': { backgroundColor: '#ff1a8c' }
  }}
  size="small"
>
  Remove
</Button>
        </div>
      ))}
    </div>
  );
}

export default App