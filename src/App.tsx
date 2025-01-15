import { useState } from 'react'
import './App.css'
import Button from '@mui/material/Button';

const ListContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
  border: "3px solid #ff1a8c",
  borderRadius: "10px",
  backgroundColor: "#f8f9fa",
  maxHeight: "400px",
  overflowY: "auto",
  width: '100%',
  boxSizing: 'border-box',
};
const ItemStyle = {
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

function App() {
  const [ToDos, setToDos] = useState([]);
  const [sortBy, setSortBy] = useState("all");
  const [completedToDos, setCompletedToDos] = useState([]);
  const clearCompletedToDos = () => {
    setCompletedToDos([]);
  };

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

  const moveToDone = (id) => {
    const todoToMove = ToDos.find(ToDo => ToDo.id === id);
    setToDos(ToDos.filter(ToDo => ToDo.id !== id));
    setCompletedToDos([...completedToDos, todoToMove]);
  };

  const restoreToDo = (id) => {
    const todoToRestore = completedToDos.find(todo => todo.id === id);
    setCompletedToDos(completedToDos.filter(todo => todo.id !== id));
    setToDos([...ToDos, todoToRestore]);
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ToDoList ToDos={filteredToDos} onRemove={moveToDone} />
        <DoneList completedToDos={completedToDos} onRestore={restoreToDo} onClear={clearCompletedToDos} />
      </div>
    </div>
  );
}
function ToDoInput({ onAdd }) {
  const ToDoInputContainerStyle = {
    padding: "20px",
    display: "flex",
    gap: "30px",
    border: "solid 3px #ff4da3"
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
  return (
    <div style={ListContainerStyle}>
      <h2>To Do List</h2>
      {ToDos.map((ToDo) => (
        <div key={ToDo.id} style={ItemStyle}>
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
  Done
</Button>
        </div>
      ))}
    </div>
  );
}
function DoneList({ completedToDos, onRestore, onClear}) {
  return (
    <div style={ListContainerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2>To Done List</h2>
        <Button 
          onClick={onClear}
          variant="contained" 
          sx={{
            backgroundColor: '#ff4da3', 
            '&:hover': { backgroundColor: '#ff1a8c' }
          }}
          size="small"
        >
          Clear All
        </Button>
      </div>
      {completedToDos.map((completedToDo) => (
        <div key={completedToDo.id} style={ItemStyle}>
          <span>List Owner: {completedToDo.listOwner}</span>
          <span>{completedToDo.title}</span>
          <Button 
            onClick={() => onRestore(completedToDo.id)} 
            variant="contained" 
            sx={{
              backgroundColor: '#ff4da3', '&:hover': { backgroundColor: '#ff1a8c' }
            }}
            size="small"
          >
            Restore
          </Button>
        </div>
      ))}
    </div>
  );
}

export default App