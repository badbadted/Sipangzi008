import { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Calendar } from 'lucide-react';
import type { Todo } from '../types/todo';

function formatDateForInput(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

function isOverdue(plannedCompletionDate: number | undefined, completed: boolean): boolean {
  if (completed || plannedCompletionDate == null) return false;
  const todayStart = new Date().setHours(0, 0, 0, 0);
  return plannedCompletionDate < todayStart;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onUpdatePlannedDate: (id: string, plannedCompletionDate: number | undefined) => void;
  onRemove: (id: string) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onUpdatePlannedDate,
  onRemove,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editingDate, setEditingDate] = useState(false);
  const [editDateValue, setEditDateValue] = useState(
    todo.plannedCompletionDate != null
      ? formatDateForInput(todo.plannedCompletionDate)
      : ''
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const overdue = isOverdue(todo.plannedCompletionDate, todo.completed);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    if (editingDate) {
      setEditDateValue(
        todo.plannedCompletionDate != null
          ? formatDateForInput(todo.plannedCompletionDate)
          : ''
      );
      dateInputRef.current?.focus();
    }
  }, [editingDate, todo.plannedCompletionDate]);

  const handleSubmit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onUpdate(todo.id, trimmed);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  };

  const handleDateBlur = () => {
    if (editDateValue.trim() !== '') {
      const ts = new Date(editDateValue).setHours(0, 0, 0, 0);
      onUpdatePlannedDate(todo.id, ts);
    } else {
      onUpdatePlannedDate(todo.id, undefined);
    }
    setEditingDate(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setEditDateValue(v);
    if (v.trim() !== '') {
      const ts = new Date(v).setHours(0, 0, 0, 0);
      onUpdatePlannedDate(todo.id, ts);
    } else {
      onUpdatePlannedDate(todo.id, undefined);
    }
    setEditingDate(false);
  };

  return (
    <li
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 mb-2 last:mb-0 ${
        overdue
          ? 'bg-red-50 border-red-200'
          : 'bg-white border-slate-200'
      } ${todo.completed ? 'opacity-90' : ''}`}
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
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <span
            className={`text-left text-slate-700 cursor-pointer select-none ${
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
          <div className="flex items-center gap-1.5 flex-wrap">
            {editingDate ? (
              <input
                ref={dateInputRef}
                type="date"
                value={editDateValue}
                onChange={handleDateChange}
                onBlur={handleDateBlur}
                className="border border-slate-300 rounded-lg px-2 py-1 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="編輯預計完成日期"
              />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setEditingDate(true)}
                  className="inline-flex items-center gap-1 rounded-lg p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  aria-label="修改預計完成日期"
                >
                  <Calendar className="h-4 w-4" aria-hidden />
                </button>
                {todo.plannedCompletionDate != null ? (
                  <span
                    className={`text-sm ${overdue ? 'text-red-600 font-medium' : 'text-slate-500'}`}
                  >
                    預計：{new Date(todo.plannedCompletionDate).toLocaleDateString('zh-TW', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                    {overdue && ' 逾期'}
                  </span>
                ) : (
                  <span className="text-slate-400 text-sm">點擊日曆設定日期</span>
                )}
              </>
            )}
          </div>
        </div>
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
