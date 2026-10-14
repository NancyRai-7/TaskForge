import React, { useMemo, useState } from 'react';
import { LogoMark, SearchIcon, BellIcon } from './Icons.jsx';

const COLUMNS = [
  {
    name: 'Backlog',
    badge: 'bg-purple-100 text-purple-800',
    dot: 'bg-purple-500',
    tasks: [
      { id: '#042', priority: 'P2 · MED', due: 'Oct 09', title: 'Define workspace permission matrix', detail: 'Map owner, manager, member and viewer access.', owner: 'Nancy Rai', initials: 'NR', comments: 1, progress: '1/2' },
      { id: '#049', priority: 'P3 · LOW', due: 'Oct 14', title: 'Draft attachment storage policy', detail: 'Define file types, limits, retention, and ownership.', owner: 'Devi P.', initials: 'DP' },
      { id: '#051', priority: 'P2 · MED', due: 'Oct 16', title: 'Prepare launch checklist', detail: 'Gather the final release steps for the team.', owner: 'Alex M.', initials: 'AM' },
    ],
  },
  {
    name: 'In progress',
    badge: 'bg-amber-100 text-amber-800',
    dot: 'bg-amber-500',
    tasks: [
      { id: '#038', priority: 'P1 · HIGH', due: 'Oct 08', title: 'Build project activity feed', detail: 'Show task updates and decisions in one timeline.', owner: 'Jordan Lee', initials: 'JL', comments: 3, progress: '2/4' },
      { id: '#044', priority: 'P2 · MED', due: 'Oct 11', title: 'Improve board filters', detail: 'Filter tasks by owner, due date, and priority.', owner: 'Sam K.', initials: 'SK', progress: '3/5' },
    ],
  },
  {
    name: 'In review',
    badge: 'bg-teal-100 text-teal-800',
    dot: 'bg-teal-500',
    tasks: [
      { id: '#035', priority: 'P2 · MED', due: 'Oct 07', title: 'Create project templates', detail: 'Help teams start new work with a clear structure.', owner: 'Jamie R.', initials: 'JR', comments: 2, progress: '4/4' },
    ],
  },
  {
    name: 'Done',
    badge: 'bg-emerald-100 text-emerald-800',
    dot: 'bg-emerald-500',
    tasks: [
      { id: '#029', priority: 'P3 · LOW', due: 'Oct 05', title: 'Set up team workspace', detail: 'Workspace is ready for the first sprint.', owner: 'Nancy Rai', initials: 'NR', progress: '3/3' },
    ],
  },
];

export default function WorkspaceHome({
  projectName = 'MVP delivery board',
  onEnterWorkspace,
  onGoToDashboard,
  onOpenInbox,
}) {
  const [query, setQuery] = useState('');

  const visibleColumns = useMemo(
    () =>
      COLUMNS.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) =>
          `${task.title} ${task.detail} ${task.owner} ${task.id}`.toLowerCase().includes(query.toLowerCase())
        ),
      })),
    [query]
  );

  const visibleCount = visibleColumns.reduce((total, column) => total + column.tasks.length, 0);

  return (
    <div className="min-h-screen bg-[#f7f8f4] text-[#20231f] font-sans">
      {/* Workspace Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-stone-200 px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        <a
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            onGoToDashboard();
          }}
          className="flex items-center gap-2.5 font-display text-stone-900 group"
          aria-label="Back to TaskForge dashboard"
        >
          <LogoMark size={28} className="shrink-0 group-hover:scale-105 transition-transform" />
          <span className="flex flex-col">
            <strong className="text-sm font-extrabold leading-none">TaskForge</strong>
            <small className="text-[10px] text-stone-500 mt-0.5">Product workspace · Sprint 01</small>
          </span>
        </a>

        {/* Workspace Tools */}
        <div className="flex items-center gap-3">
          <label className="relative hidden sm:flex items-center text-stone-400">
            <SearchIcon size={14} className="absolute left-3 pointer-events-none" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks, owners, priorities…"
              aria-label="Search tasks, owners, priorities"
              className="h-9 w-64 pl-8 pr-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-brand focus:bg-white"
            />
          </label>

          <button
            onClick={() => (onOpenInbox ? onOpenInbox() : window.alert('Your inbox is not available yet.'))}
            className="w-9 h-9 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-600 hover:bg-stone-50 cursor-pointer text-xs shadow-2xs"
            aria-label="Open notifications"
          >
            <BellIcon size={16} />
          </button>

          <button
            onClick={onEnterWorkspace}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#20231f] text-white text-xs font-bold hover:bg-stone-800 transition cursor-pointer"
          >
            Open workspace <span className="text-[#c6f36a]">↗</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Board */}
      <main className="max-w-[1600px] mx-auto p-4 sm:p-8 flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <span>WORKSPACE</span>
          <span>/</span>
          <b className="text-stone-800">{projectName.toUpperCase()}</b>
        </div>

        {/* Board Title & Progress */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#647348] mb-1">
              TEAM PROJECT / SPRINT 01
            </p>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 tracking-tight">
              {projectName}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              A shared view of what the team is working on and what comes next.
            </p>
          </div>

          <div className="flex flex-col gap-1.5 bg-white p-3.5 rounded-xl border border-stone-200 min-w-[240px]">
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span><b>{visibleCount}</b> visible tasks</span>
              <span className="font-bold text-emerald-700">25% complete</span>
            </div>
            <div className="h-2 rounded-full bg-stone-100 overflow-hidden flex">
              <span className="h-full bg-purple-400 w-1/4" />
              <span className="h-full bg-amber-400 w-1/4" />
              <span className="h-full bg-teal-400 w-1/4" />
              <span className="h-full bg-emerald-500 w-1/4" />
            </div>
            <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
              <span>Backlog</span>
              <span>In progress</span>
              <span>Review</span>
              <span>Done</span>
            </div>
          </div>
        </section>

        {/* Columns Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start" aria-label="Task board columns">
          {visibleColumns.map((column) => (
            <div
              key={column.name}
              className="flex flex-col gap-3 p-3.5 bg-stone-100/70 border border-stone-200/80 rounded-2xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${column.dot}`} />
                  <h2 className="text-xs font-bold text-stone-900">{column.name}</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-stone-600 border border-stone-200">
                  {column.tasks.length.toString().padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-col gap-2.5 min-h-[120px]">
                {column.tasks.length ? (
                  column.tasks.map((task) => (
                    <article
                      key={task.id}
                      className="p-3.5 bg-white rounded-xl border border-stone-200/90 shadow-xs hover:border-brand/70 hover:shadow-sm transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="px-2 py-0.5 rounded font-bold bg-stone-100 text-stone-700">
                          {task.priority}
                        </span>
                        <time className="text-stone-400 font-medium">{task.due}</time>
                      </div>

                      <h3 className="text-xs font-bold text-stone-900 leading-snug">
                        {task.title}
                      </h3>

                      <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                        {task.detail}
                      </p>

                      <footer className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
                        <span className="flex items-center gap-1.5 font-medium">
                          <i className="w-5 h-5 rounded-full bg-stone-800 text-lime not-italic flex items-center justify-center font-bold text-[9px]">
                            {task.initials}
                          </i>
                          {task.owner}
                        </span>
                        <span className="font-mono text-stone-400 font-bold">{task.id}</span>
                      </footer>
                    </article>
                  ))
                ) : (
                  <p className="text-center py-8 text-xs text-stone-400 font-medium">
                    {query ? 'No matching tasks' : 'No tasks here yet'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="py-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> All changes saved locally
          </span>
          <span>TaskForge · Progress made visible</span>
        </footer>
      </main>
    </div>
  );
}
