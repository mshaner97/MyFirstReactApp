import { Button } from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "./contexts/ThemeContext";

export default function ToDoInput({ onAdd, sortBy, setSortBy, uniqueOwners}) {
  const { theme } = useThemeContext();
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
