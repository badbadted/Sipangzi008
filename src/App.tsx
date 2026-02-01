import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
  } = useTodos();

  return (
    <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-black text-slate-900 mb-6">待辦清單</h1>
        <TodoForm onSubmit={addTodo} />
        <TodoFilter current={filter} onChange={setFilter} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onRemove={removeTodo}
        />
      </div>
    </main>
  );
}

export default App;
