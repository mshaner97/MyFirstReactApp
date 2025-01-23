import { useState } from 'react'
import './App.css'
import Button from '@mui/material/Button';
import DoneList from './DoneList';
import ToDoInput from './TodoInput';
import ToDoList from './TodoList';
import { useThemeContext } from './contexts/ThemeContext';

const textStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginRight: '10px',
};

function App() {
  const { theme: currentTheme, toggleMode } = useThemeContext();

  // This was replaced by the setMode(callback) call below
  // useEffect(() => {
  //   document.body.className = mode;
  // }, [mode]);



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
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px'}}>
        <ToDoList ToDos={filteredToDos} onRemove={moveToDone} />
        <DoneList completedToDos={completedToDos} onRestore={restoreToDo} onClear={clearCompletedToDos} />
      </div>
    </div>
  );
}

export default App