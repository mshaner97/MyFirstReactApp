import { useThemeContext } from "./contexts/ThemeContext";
import { ListContainerStyle } from "./styles";
import ToDoItem from "./TodoItem";

export default function ToDoList({ ToDos, onRemove }) {
  const { theme } = useThemeContext();
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
