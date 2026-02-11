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

const selectClass =
  'min-w-[6rem] border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white';

export function TodoFilter({ current, onChange }: TodoFilterProps) {
  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value as FilterType)}
      className={selectClass}
      aria-label="篩選待辦"
    >
      {FILTERS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
