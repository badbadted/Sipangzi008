import { TodoItem } from './TodoItem';
import type { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onRemove: (id: string) => void;
}

export function TodoList({
  todos,
  onToggle,
  onUpdate,
  onRemove,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p
        className="text-center text-slate-500 text-sm py-8"
        aria-live="polite"
      >
        尚無待辦，或此篩選下沒有項目。
      </p>
    );
  }

  return (
    <ul className="list-none m-0 p-0" aria-label="待辦列表">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
