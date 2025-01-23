import { Button } from "@mui/material";

const ItemStyle = {
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #ced4da",
  padding: "15px",
  backgroundColor: "white",
  boxSizing: 'border-box',
  minWidth: 0,
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'row',
  gap: '5px',
};

export default function ToDoItem({ todo, onAction, actionText, theme }) {

  const itemStyle = {
    ...ItemStyle,
    backgroundColor: theme.backgroundColor,
    border: `1px solid ${theme.primaryColor}`,
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