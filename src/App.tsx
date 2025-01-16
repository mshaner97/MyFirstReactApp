import { useState } from 'react'
import './App.css'
import Button from '@mui/material/Button';
import { useEffect } from 'react';

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
  const [mode, setMode] = useState('light');
  useEffect(() => {
    document.body.className = mode;
  }, [mode]);
  const themes = {
    light: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      primaryColor: '#ff4da3',
      secondaryColor: '#f7c3e9'
    },
    dark: {
      backgroundColor: '#323232',
      textColor: '#ffffff',
      primaryColor: '#c5a0eb',
      secondaryColor: '#5c4c6b'
    }
  };
  const currentTheme = themes[mode];
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

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
    <div className="App" style={{ backgroundColor: currentTheme.backgroundColor, color: currentTheme.textColor }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          onClick={toggleMode}
          variant="contained"
          sx={{
            padding: '10px',
            margin: '20px',
            backgroundColor: currentTheme.primaryColor,
            '&:hover': { backgroundColor: currentTheme.secondaryColor }
          }}
        >
          Switch Mode
        </Button>
      </div>
      <ToDoInput 
        onAdd={addToDo} 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
        uniqueOwners={uniqueOwners}
        theme={currentTheme}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px'}}>
        <ToDoList ToDos={filteredToDos} onRemove={moveToDone} theme={currentTheme} />
        <DoneList completedToDos={completedToDos} onRestore={restoreToDo} onClear={clearCompletedToDos} theme={currentTheme}/>
      </div>
    </div>
  );
}
function ToDoInput({ onAdd, sortBy, setSortBy, uniqueOwners, theme}) {
  const ToDoInputContainerStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    border: `solid 3px ${theme.primaryColor}`,
    borderRadius: "8px",
    boxSizing: 'border-box',
    backgroundColor: theme.secondaryColor,
  };
  const TopRowStyle = {
    display: "flex",
    gap: "20px",
    alignItems: "flex-end",
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
      <div style={TopRowStyle}>
        <label htmlFor="listOwner">
          Username:
          <input id="listOwner" onChange={(e) => setListOwner(e.target.value)} value={listOwner} />
        </label>
        <label htmlFor='listName'>
          To Do Item:
          <input id="listName" onChange={(e) => setListName(e.target.value)} value={listName} />
        </label>
        <Button 
          onClick={handleSubmit}
          variant="contained" 
          sx={{ 
            backgroundColor: theme.primaryColor, 
            '&:hover': { backgroundColor: theme.secondaryColor },
            color: theme.backgroundColor,
          }}
          size="small"
        >
          Add To Do Item
        </Button>
      </div>
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
  );
}

function ToDoList({ ToDos, onRemove, theme }) {
  const listContainerStyle = {
    ...ListContainerStyle,
    border: `3px solid ${theme.primaryColor}`,
    backgroundColor: theme.secondaryColor,
  };

  const itemStyle = {
    ...ItemStyle,
    backgroundColor: theme.backgroundColor,
    border: `1px solid ${theme.primaryColor}`,
  };
  return (
    <div style={listContainerStyle}>
      <h2 style={{ color: theme.textColor }}>To Do List</h2>
      {ToDos.map((ToDo) => (
        <div key={ToDo.id} style={itemStyle}>
          <span style={{ color: theme.textColor }}>List Owner: {ToDo.listOwner}</span>
          <span style={{ color: theme.textColor }}>{ToDo.title}</span>
          <Button 
            onClick={() => onRemove(ToDo.id)} 
            variant="contained" 
            sx={{
              backgroundColor: theme.primaryColor,
              '&:hover': { backgroundColor: theme.secondaryColor },
              color: theme.backgroundColor,
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
function DoneList({ completedToDos, onRestore, onClear, theme}) {
  const listContainerStyle = {
    ...ListContainerStyle,
    border: `3px solid ${theme.primaryColor}`,
    backgroundColor: theme.secondaryColor,
  };

  const itemStyle = {
    ...ItemStyle,
    backgroundColor: theme.backgroundColor,
    border: `1px solid ${theme.primaryColor}`,
  };
  return (
    <div style={listContainerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2 style={{ color: theme.textColor }}>To Done List</h2>
        <Button 
          onClick={onClear}
          variant="contained" 
          sx={{
            backgroundColor: theme.primaryColor,
            '&:hover': { backgroundColor: theme.secondaryColor },
            color: theme.backgroundColor,
          }}
          size="small"
        >
          Clear All
        </Button>
      </div>
      {completedToDos.map((completedToDo) => (
        <div key={completedToDo.id} style={itemStyle}>
          <span style={{ color: theme.textColor }}>List Owner: {completedToDo.listOwner}</span>
          <span style={{ color: theme.textColor }}>{completedToDo.title}</span>
          <Button 
            onClick={() => onRestore(completedToDo.id)} 
            variant="contained" 
            sx={{
              backgroundColor: theme.primaryColor,
              '&:hover': { backgroundColor: theme.secondaryColor },
              color: theme.backgroundColor,
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