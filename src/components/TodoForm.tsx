import { useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onSubmit: (text: string) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <form
      className="flex gap-2 mb-6"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="flex-1 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        placeholder="新增待辦..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="待辦內容"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={!text.trim()}
      >
        <Plus className="w-4 h-4 text-blue-100" aria-hidden />
        新增
      </button>
    </form>
  );
}
