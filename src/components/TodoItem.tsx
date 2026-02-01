import { useState, useRef, useEffect } from 'react';
import { Check, Trash2 } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onRemove: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onUpdate, onRemove }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleSubmit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onUpdate(todo.id, trimmed);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  };

  return (
    <li
      className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 mb-2 last:mb-0 ${
        todo.completed ? 'opacity-90' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 rounded-full p-0.5 text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-label={`標記「${todo.text}」為${todo.completed ? '未完成' : '完成'}`}
      >
        {todo.completed ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
            <Check className="h-3 w-3" aria-hidden />
          </span>
        ) : (
          <span className="block h-5 w-5 rounded-full border-2 border-slate-300" />
        )}
      </button>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          className="flex-1 border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          aria-label="編輯待辦"
        />
      ) : (
        <span
          className={`flex-1 text-left text-slate-700 cursor-pointer select-none ${
            todo.completed
              ? 'line-through text-slate-500 text-green-700/80'
              : ''
          }`}
          onDoubleClick={() => setEditing(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(true)}
        >
          {todo.text}
        </span>
      )}
      <button
        type="button"
        className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
        onClick={() => onRemove(todo.id)}
        aria-label={`刪除「${todo.text}」`}
      >
        <Trash2 className="h-4 w-4" aria-hidden />
      </button>
    </li>
  );
}
