import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoCategory } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  }, [todos]);

  const addTodo = useCallback((text: string, category: TodoCategory, dueDate: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        category,
        createdAt: Date.now(),
        dueDate,
      },
    ]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prevTodos => 
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo };
}