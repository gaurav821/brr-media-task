import { useState, useEffect } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../utils/api";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const createTodo = async (text) => {
    setLoading(true);
    try {
      const trimmedText = text.trim();
      if (!trimmedText) {
        throw new Error("Task cannot be empty");
      }

      const exists = todos.some(
        (todo) => todo.text.trim().toLowerCase() === trimmedText.toLowerCase()
      );

      if (exists) {
        throw new Error("This task already exists!");
      }

      await addTodo(trimmedText);
      const updated = await fetchTodos();
      setTodos(updated);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    setLoading(true);
    try {
      const todo = todos.find((t) => t.id === id);
      const updated = await updateTodo(id, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      return updated;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id) => {
    setLoading(true);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveTodo = async (id) => {
    setLoading(true);
    try {
      const trimmedText = editText.trim();
      if (!trimmedText) {
        throw new Error("Task cannot be empty");
      }

      const exists = todos.some(
        (todo) =>
          todo.id !== id &&
          todo.text.trim().toLowerCase() === trimmedText.toLowerCase()
      );

      if (exists) {
        throw new Error("This task already exists!");
      }

      await updateTodo(id, { text: trimmedText });
      const updated = await fetchTodos();
      setTodos(updated);
      setEditingId(null);
      setEditText("");
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    loading,
    error,
    createTodo,
    toggleTodo,
    removeTodo,
    editingId,
    editText,
    setEditText,
    startEditing,
    cancelEditing,
    saveTodo,
  };
};
