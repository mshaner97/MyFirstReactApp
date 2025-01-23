import { Button } from "@mui/material";
import ToDoItem from "./TodoItem";
import { ListContainerStyle } from "./styles";
import { useThemeContext } from "./contexts/ThemeContext";

export default function DoneList({ completedToDos, onRestore, onClear}) {
  const { theme } = useThemeContext();
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