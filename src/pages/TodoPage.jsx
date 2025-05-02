import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  List,
  Box,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TodoItem } from "../components/todos/TodoItem";
import { AlertToast } from "../components/common/AlertToast";
import { useTodos } from "../hooks/useTodos";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { FormField } from "../components/common/FormField";

export default function TodoPage(){
  const [newTodo, setNewTodo] = useState("");
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const { 
    todos, 
    loading, 
    createTodo, 
    toggleTodo, 
    removeTodo,
    editingId,
    editText,
    setEditText,
    startEditing,
    cancelEditing,
    saveTodo
  } = useTodos();

  const todoInputRef = React.useRef(null);
  const firstTodoRef = React.useRef(null);

  useEffect(() => {
    if (!loading && todos.length > 0 && firstTodoRef.current) {
      firstTodoRef.current.focus();
    }
  }, [loading, todos]);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await createTodo(newTodo);
        setNewTodo("");
        showAlert("Task added successfully!", "success");
        todoInputRef.current?.focus();
      } catch (err) {
        showAlert(err.message, "error");
      }
    } else {
      showAlert("Task cannot be empty", "error");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newTodo.trim()) {
      handleAddTodo();
    }
  };

  const showAlert = (message, severity = "info") => {
    setAlertState({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseAlert = () => {
    setAlertState((prev) => ({ ...prev, open: false }));
  };

  const handleSaveTodo = async (id) => {
    try {
      await saveTodo(id);
      showAlert("Task updated successfully!", "success");
    } catch (err) {
      showAlert(err.message, "error");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await removeTodo(id);
      showAlert("Task deleted successfully!", "success");
    } catch (err) {
      showAlert(err.message, "error");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container 
      maxWidth="md" 
      sx={{ py: 4 }}
      component="main"
      aria-labelledby="todo-page-title"
    >
      <Typography 
        id="todo-page-title"
        variant="h4" 
        gutterBottom 
        sx={{ fontWeight: { xs: 500, md: 600 } }}
        tabIndex={-1}
      >
        To-Do List
      </Typography>

      <Box 
        display="flex" 
        mb={3}
        component="section"
        aria-label="Add new task"
      >
        <FormField
          inputRef={todoInputRef}
          label="Add new task"
          name="newTodo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          required
          sx={{ margin: "0 !important" }}
          inputProps={{
            'aria-required': 'true',
            'aria-label': 'New task description'
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          sx={{ 
            ml: 2,
            '&:focus': {
              outline: '3px solid',
              outlineColor: 'primary.main',
              outlineOffset: '2px'
            }
          }}
          startIcon={<AddIcon />}
          disabled={!newTodo.trim()}
          aria-label="Add task"
        >
          Add
        </Button>
      </Box>

      <Paper 
        elevation={2}
        component="section"
        aria-label="Task list"
      >
        {todos.length === 0 ? (
          <Box 
            p={3} 
            textAlign="center"
            aria-live="polite"
          >
            <Typography variant="body1" color="text.secondary">
              No tasks yet. Add one above!
            </Typography>
          </Box>
        ) : (
          <List aria-label="Tasks">
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={handleDeleteTodo}
                editingId={editingId}
                editText={editText}
                setEditText={setEditText}
                onStartEdit={startEditing}
                onCancelEdit={cancelEditing}
                onSave={handleSaveTodo}
                innerRef={index === 0 ? firstTodoRef : null}
                aria-labelledby={`task-${todo.id}`}
              />
            ))}
          </List>
        )}
      </Paper>

      <AlertToast
        open={alertState.open}
        onClose={handleCloseAlert}
        message={alertState.message}
        severity={alertState.severity}
      />
    </Container>
  );
};