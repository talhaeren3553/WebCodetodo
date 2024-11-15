import React from 'react';
import { TodoCategory } from '../types/todo';

interface CategoryFilterProps {
  currentFilter: TodoCategory;
  onFilterChange: (filter: TodoCategory) => void;
}

export function CategoryFilter({ currentFilter, onFilterChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {['all', 'personal', 'work', 'shopping', 'health'].map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category as TodoCategory)}
          className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
            currentFilter === category
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category === 'all' ? 'Tümü' :
           category === 'personal' ? 'Kişisel' :
           category === 'work' ? 'İş' :
           category === 'shopping' ? 'Alışveriş' : 'Sağlık'}
        </button>
      ))}
    </div>
  );
}