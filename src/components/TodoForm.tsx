import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { TodoCategory } from '../types/todo';

interface TodoFormProps {
  onAdd: (text: string, category: TodoCategory, dueDate: string) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input, category, dueDate);
      setInput('');
      setDueDate('');
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Yeni görev ekle..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <PlusCircle size={20} />
            Ekle
          </button>
        </div>
        <div className="flex gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TodoCategory)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="personal">Kişisel</option>
            <option value="work">İş</option>
            <option value="shopping">Alışveriş</option>
            <option value="health">Sağlık</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={minDate}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
    </form>
  );
}