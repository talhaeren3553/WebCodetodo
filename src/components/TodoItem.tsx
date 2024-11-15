import React, { useMemo } from 'react';
import { CheckCircle, Circle, Trash2, Calendar } from 'lucide-react';
import { Todo } from '../types/todo';
import { formatDate, formatRelativeDate } from '../utils/dateUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const categoryColors = {
    personal: 'bg-blue-100',
    work: 'bg-yellow-100',
    shopping: 'bg-green-100',
    health: 'bg-red-100',
  };

  const getDueDateColor = useMemo(() => {
    if (!todo.dueDate) return 'text-gray-500';
    try {
      const daysLeft = Math.ceil(
        (new Date(todo.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      if (daysLeft < 0) return 'text-red-500';
      if (daysLeft <= 2) return 'text-orange-500';
      return 'text-green-500';
    } catch (error) {
      console.error('Error calculating due date color:', error);
      return 'text-gray-500';
    }
  }, [todo.dueDate]);

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg ${
        todo.completed ? 'bg-gray-50' : 'bg-white'
      } border border-gray-200 shadow-sm transition-all hover:shadow-md`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className="text-purple-600 hover:text-purple-800 transition-colors"
      >
        {todo.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
      </button>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`text-lg ${
              todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}
          >
            {todo.text}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[todo.category]}`}>
            {todo.category}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm">
          <span className="text-gray-500">
            Oluşturulma: {formatDate(todo.createdAt)}
          </span>
          {todo.dueDate && (
            <span className={`flex items-center gap-1 ${getDueDateColor}`}>
              <Calendar size={14} />
              Bitiş: {formatRelativeDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 transition-colors"
        aria-label="Görevi sil"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}