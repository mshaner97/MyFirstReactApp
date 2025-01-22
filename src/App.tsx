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

  // This was replaced by the setMode(callback) call below
  // useEffect(() => {
  //   document.body.className = mode;
  // }, [mode]);

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
    setMode((previousMode) => {
      // What is returned from this is what the state will be on the next render...
      // But we can also do other stuff here, like change the body class

      const nextMode = previousMode === 'light' ? 'dark' : 'light';
      document.body.className = nextMode;
      return nextMode;
    });
  };

  const [ToDos, setToDos] = useState([]);
  const [sortBy, setSortBy] = useState("all");
  const [completedToDos, setCompletedToDos] = useState([]);
  const clearCompletedToDos = () => {
    setCompletedToDos([]);
  };

  const addToDo = (listOwner, title, comment, priority) => {
    const newToDo = {
      id: Date.now(),
      listOwner: listOwner,
      title: title,
      comment: comment,
      priority: priority
    };
    setToDos([newToDo, ...ToDos]);
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
  const [listOwner, setListOwner] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = () => {
    if (listOwner && title) {
      onAdd(listOwner, title, comment, priority);
      setListOwner("");
      setTitle("");
      setComment("");
      setPriority("low")
    }
  };

  return (
    <div style={ToDoInputContainerStyle}>
      <div style={TopRowStyle}>
        <label htmlFor="listOwner">
          Username:
          <input id="listOwner" onChange={(e) => setListOwner(e.target.value)} value={listOwner} />
        </label>
        <label htmlFor='title'>
          Title:
          <input id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label htmlFor='comment'>
          Comment:
          <input id="comment" onChange={(e) => setComment(e.target.value)} value={comment} />
        </label>
        <label htmlFor='priority'>
          Priority:
          <select id="priority" onChange={(e) => setPriority(e.target.value)} value={priority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
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
function ToDoItem({ todo, onAction, actionText, theme }) {
  const itemStyle = {
    ...ItemStyle,
    backgroundColor: theme.backgroundColor,
    border: `1px solid ${theme.primaryColor}`,
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
  };

  return (
    <div key={todo.id} style={itemStyle}>
      <span style={{ color: theme.textColor }}>Owner: {todo.listOwner}</span>
      <span style={{ color: theme.textColor }}>Title: {todo.title}</span>
      <span style={{ color: theme.textColor }}>Comment: {todo.comment}</span>
      <span style={{ color: theme.textColor }}>Priority: {todo.priority}</span>
      <Button 
        onClick={() => onAction(todo.id)} 
        variant="contained" 
        sx={{
          backgroundColor: theme.primaryColor,
          '&:hover': { backgroundColor: theme.secondaryColor },
          color: theme.backgroundColor,
        }}
        size="small"
      >
        {actionText}
      </Button>
    </div>
  );
}
function ToDoList({ ToDos, onRemove, theme }) {
  const listContainerStyle = {
    ...ListContainerStyle,
    border: `3px solid ${theme.primaryColor}`,
    backgroundColor: theme.secondaryColor,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const recentToDoContainerStyle = {
    overflow: 'hidden',
  };

  const recentToDoHeaderStyle = {
    backgroundColor: theme.primaryColor,
    color: theme.backgroundColor,
    padding: '10px',
    margin: '0',
  };

  const [mostRecentToDo, ...otherToDos] = ToDos;

  return (
    <div style={listContainerStyle}>
      <h2 style={{ color: theme.textColor, marginBottom: '10px' }}>To Do List</h2>
      {mostRecentToDo && (
        <div style={recentToDoContainerStyle}>
          <h3 style={recentToDoHeaderStyle}>Most Recent To-Do</h3>
          <div style={{ backgroundColor: '#ff8dc6', borderRadius: '4px' }}>
            <ToDoItem 
              todo={mostRecentToDo}
              onAction={onRemove}
              actionText="Done"
              theme={{...theme, backgroundColor: '#ff8dc6', textColor: theme.backgroundColor}}
            />
          </div>
        </div>
      )}
      {otherToDos.map((todo) => (
        <ToDoItem 
          key={todo.id}
          todo={todo}
          onAction={onRemove}
          actionText="Done"
          theme={theme}
        />
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
        <ToDoItem 
          key={completedToDo.id}
          todo={completedToDo}
          onAction={onRestore}
          actionText="Restore"
          theme={theme}
        />
      ))}
    </div>
  );
}
export default App