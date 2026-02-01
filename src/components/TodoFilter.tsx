import type { FilterType } from '../types/todo';

interface TodoFilterProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '未完成' },
  { value: 'completed', label: '已完成' },
];

export function TodoFilter({ current, onChange }: TodoFilterProps) {
  return (
    <div
      className="flex gap-1 mb-6"
      role="group"
      aria-label="篩選待辦"
    >
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            current === value
              ? 'bg-blue-600 text-white border border-blue-600'
              : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
          }`}
          onClick={() => onChange(value)}
          aria-pressed={current === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
