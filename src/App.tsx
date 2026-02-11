import { useRef, useLayoutEffect } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { ExternalLinks } from './components/ExternalLinks';
import type { UserFilterType } from './types/todo';

const LOG_ENDPOINT = 'http://127.0.0.1:7246/ingest/939cc835-2ba9-4a43-a409-8aeac1dd68b4';

function logLayout(location: string, hypothesisId: string, data: Record<string, unknown>) {
  fetch(LOG_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location,
      message: 'layout alignment',
      hypothesisId,
      data,
      timestamp: Date.now(),
      sessionId: 'debug-session',
    }),
  }).catch(() => {});
}

function App() {
  const flexRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);

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

  // #region agent log
  useLayoutEffect(() => {
    const run = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 0;
      const flex = flexRef.current?.getBoundingClientRect();
      const main = mainContentRef.current?.getBoundingClientRect();
      const aside = asideRef.current?.getBoundingClientRect();
      logLayout('App.tsx:layout', 'H1', {
        innerWidth: w,
        isLg: w >= 1024,
        flexLeft: flex?.left,
        flexWidth: flex?.width,
        mainLeft: main?.left,
        mainWidth: main?.width,
        asideLeft: aside?.left,
        asideWidth: aside?.width,
      });
      logLayout('App.tsx:layout', 'H2', {
        mainTop: main?.top,
        asideTop: aside?.top,
        mainHeight: main?.height,
        asideHeight: aside?.height,
      });
      logLayout('App.tsx:layout', 'H3', {
        mainRight: main?.right,
        asideRight: aside?.right,
        leftDiff: main && aside ? main.left - aside.left : null,
      });
    };
    run();
    const t = setTimeout(run, 100);
    const onResize = () => run();
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  // #endregion

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div ref={flexRef} className="flex flex-col lg:flex-row gap-6">
        <div ref={mainContentRef} className="order-2 lg:order-none flex-1 min-w-0 max-w-xl">
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
        </div>
        <ExternalLinks ref={asideRef} />
      </div>
    </main>
  );
}

export default App;
