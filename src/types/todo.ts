export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  createdAt: number;
  dueDate?: string;
}

export type TodoCategory = 'all' | 'personal' | 'work' | 'shopping' | 'health';