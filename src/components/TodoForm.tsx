import { useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';
import type { UserId } from '../types/todo';

const selectClass =
  'min-w-[6rem] border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white';

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

interface TodoFormProps {
  onSubmit: (
    text: string,
    userId: UserId,
    plannedCompletionDate: number
  ) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState<UserId>('TED');
  const [plannedDate, setPlannedDate] = useState(todayString);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() || !plannedDate.trim()) return;
    const planned = new Date(plannedDate).setHours(0, 0, 0, 0);
    onSubmit(text.trim(), userId, planned);
    setText('');
    setUserId('TED');
    setPlannedDate(todayString());
  };

  const canSubmit =
    text.trim() !== '' && userId !== '' && plannedDate.trim() !== '';

  return (
    <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          className="flex-1 min-w-[12rem] border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="新增待辦..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="待辦內容"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={!canSubmit}
        >
          <Plus className="w-4 h-4 text-blue-100" aria-hidden />
          新增
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="todo-user" className="text-sm font-bold text-slate-700">
          所屬
        </label>
        <select
          id="todo-user"
          value={userId}
          onChange={(e) => setUserId(e.target.value as UserId)}
          className={selectClass}
          aria-label="所屬使用者"
        >
          <option value="TED">TED</option>
          <option value="KU">KU</option>
        </select>
        <label
          htmlFor="todo-planned"
          className="text-sm font-bold text-slate-700"
        >
          預計完成（必填）
        </label>
        <input
          id="todo-planned"
          type="date"
          value={plannedDate}
          onChange={(e) => setPlannedDate(e.target.value)}
          className="border border-slate-300 rounded-lg px-2.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="預計完成日期（必填）"
        />
      </div>
    </form>
  );
}
