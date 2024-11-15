import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo, TodoCategory } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  filter: TodoCategory;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  const filteredTodos = filter === 'all' 
    ? todos 
    : todos.filter(todo => todo.category === filter);

  return (
    <div className="space-y-3">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
      
      {filteredTodos.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          {filter === 'all' 
            ? 'Henüz görev eklenmedi. Yeni bir görev ekleyerek başlayın!'
            : 'Bu kategoride görev bulunmuyor.'}
        </div>
      )}
    </div>
  );
}