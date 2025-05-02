import React from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  editingId,
  editText,
  setEditText,
  onStartEdit,
  onCancelEdit,
  onSave,
}) => {
  const isEditing = editingId === todo.id;

  return (
    <ListItem
      secondaryAction={
        !isEditing ? (
          <Stack direction="row" spacing={1}>
            <IconButton
              edge="end"
              onClick={() => onStartEdit(todo.id, todo.text)}
            >
              <Edit />
            </IconButton>
            <IconButton edge="end" onClick={() => onDelete(todo.id)}>
              <Delete />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <IconButton edge="end" onClick={() => onSave(todo.id)}>
              <Save />
            </IconButton>
            <IconButton edge="end" onClick={onCancelEdit}>
              <Cancel />
            </IconButton>
          </Stack>
        )
      }
    >
      <Checkbox
        edge="start"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        disabled={isEditing}
      />

      {isEditing ? (
        <TextField
          fullWidth
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onSave(todo.id)}
          autoFocus
        />
      ) : (
        <ListItemText
          primary={todo.text}
          sx={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "text.secondary" : "text.primary",
          }}
        />
      )}
    </ListItem>
  );
};
