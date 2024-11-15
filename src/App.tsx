import React, { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { CategoryFilter } from './components/CategoryFilter';
import { useTodos } from './hooks/useTodos';
import { TodoCategory } from './types/todo';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<TodoCategory>('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
          Yapılacaklar Listesi
        </h1>
        
        <TodoForm onAdd={addTodo} />
        <CategoryFilter currentFilter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;