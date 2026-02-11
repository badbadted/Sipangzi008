import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import type { UserFilterType } from './types/todo';

function App() {
  const {
    todos,
    filter,
    setFilter,
    userFilter,
    setUserFilter,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
    updatePlannedDate,
  } = useTodos();

  return (
    <main className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-black text-slate-900 mb-6">待辦清單</h1>
        <TodoForm onSubmit={addTodo} />
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <label className="sr-only" htmlFor="user-filter">使用者篩選</label>
          <select
            id="user-filter"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value as UserFilterType)}
            className="min-w-[6rem] border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            aria-label="使用者篩選"
          >
            <option value="all">全部</option>
            <option value="TED">TED</option>
            <option value="KU">KU</option>
          </select>
          <TodoFilter current={filter} onChange={setFilter} />
        </div>
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onUpdatePlannedDate={updatePlannedDate}
          onRemove={removeTodo}
        />
      </div>
    </main>
  );
}

export default App;
