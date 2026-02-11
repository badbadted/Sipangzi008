import { useState, useEffect, useMemo } from 'react';
import type { Todo, FilterType, UserFilterType } from '../types/todo';

const STORAGE_KEY = 'todos';

function migrateTodo(t: Todo & { userId?: Todo['userId'] }): Todo {
  if (t.userId === 'TED' || t.userId === 'KU') return t as Todo;
  return { ...t, userId: 'TED' };
}

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as (Todo & { userId?: Todo['userId'] })[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(migrateTodo);
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [filter, setFilter] = useState<FilterType>('all');
  const [userFilter, setUserFilter] = useState<UserFilterType>('all');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    let list = todos;
    if (userFilter !== 'all') {
      list = list.filter((t) => t.userId === userFilter);
    }
    switch (filter) {
      case 'active':
        list = list.filter((t) => !t.completed);
        break;
      case 'completed':
        list = list.filter((t) => t.completed);
        break;
      default:
        break;
    }
    return [...list].sort((a, b) => {
      const da = a.plannedCompletionDate ?? Infinity;
      const db = b.plannedCompletionDate ?? Infinity;
      return da - db;
    });
  }, [todos, filter, userFilter]);

  const addTodo = (
    text: string,
    userId: Todo['userId'],
    plannedCompletionDate: number
  ) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      userId,
      createdAt: Date.now(),
      plannedCompletionDate,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const updateTodo = (id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updatePlannedDate = (
    id: string,
    plannedCompletionDate: number | undefined
  ) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, plannedCompletionDate } : t
      )
    );
  };

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    userFilter,
    setUserFilter,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
    updatePlannedDate,
  };
}
