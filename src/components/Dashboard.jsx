import React, { useState } from 'react';
import AppShell, { Avatar } from './AppShell.jsx';
import { PlusIcon, SearchIcon } from './Icons.jsx';

const stats = [
  { value: 12, label: 'Open tasks', note: 'Assigned to you' },
  { value: 4, label: 'Due soon', note: 'Next 3 days', tone: 'warn' },
  { value: 2, label: 'Overdue', note: 'Needs attention', tone: 'danger' },
  { value: 9, label: 'Done this week', note: 'Across projects' },
];

const tasks = [
  {
    id: 'TF-142',
    title: 'Implement refresh-token rotation',
    project: 'Auth & Security',
    status: 'In progress',
    priority: 'High',
    due: '2026-10-14',
  },
  {
    id: 'TF-138',
    title: 'Write integration tests for task status endpoint',
    project: 'API Platform',
    status: 'In review',
    priority: 'High',
    due: '2026-10-12',
  },
  {
    id: 'TF-151',
    title: 'Design empty states for the project board',
    project: 'Web App',
    status: 'In progress',
    priority: 'Medium',
    due: '2026-10-16',
  },
  {
    id: 'TF-127',
    title: 'Configure Hangfire retry policy for reminders',
    project: 'API Platform',
    status: 'Backlog',
    priority: 'Medium',
    due: '2026-10-20',
  },
  {
    id: 'TF-160',
    title: "Add keyboard 'Move to' action on task cards",
    project: 'Web App',
    status: 'Backlog',
    priority: 'Low',
    due: null,
  },
];

const projects = [
  {
    name: 'Web App',
    open: 14,
    total: 32,
    updated: '2h ago',
    members: ['Nancy Rai', 'Arun Shah', 'Mina Lama'],
    markBg: 'bg-brand-soft text-brand-dark',
    barBg: 'bg-brand',
  },
  {
    name: 'API Platform',
    open: 9,
    total: 25,
    updated: 'Yesterday',
    members: ['Nancy Rai', 'Sita Karki'],
    markBg: 'bg-sky-100 text-sky-800',
    barBg: 'bg-sky-600',
  },
  {
    name: 'Auth & Security',
    open: 5,
    total: 18,
    updated: '3 days ago',
    members: ['Arun Shah', 'Nancy Rai'],
    markBg: 'bg-amber-100 text-amber-800',
    barBg: 'bg-amber-600',
  },
];

const activity = [
  { who: 'Arun Shah', action: 'moved', task: 'TF-138', detail: 'to In review', time: '12 min ago' },
  { who: 'Mina Lama', action: 'commented on', task: 'TF-151', detail: '', time: '1 h ago' },
  { who: 'Sita Karki', action: 'assigned you', task: 'TF-127', detail: '', time: '3 h ago' },
];

const colors = ['#718a50', '#527b76', '#b2744f', '#8471a8', '#578393'];
const colorFor = (name) =>
  colors[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length];

function dueInfo(iso) {
  if (!iso) return { text: 'No due date', className: 'text-stone-400' };
  const days = Math.round(
    (new Date(`${iso}T00:00:00`) - new Date('2026-10-14T00:00:00')) / 86400000
  );
  if (days < 0) return { text: `Overdue by ${-days}d`, className: 'text-rose-600 font-bold' };
  if (days === 0) return { text: 'Due today', className: 'text-amber-600 font-bold' };
  if (days <= 3) return { text: `Due in ${days}d`, className: 'text-amber-600 font-semibold' };
  return {
    text: new Date(`${iso}T00:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    className: 'text-stone-500',
  };
}

function TaskRow({ task }) {
  const due = dueInfo(task.due);

  const priorityStyles = {
    High: 'bg-rose-50 text-rose-700 border-rose-200/60',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200/60',
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  };

  const statusStyles = {
    'In progress': 'bg-brand-soft text-brand-dark',
    'In review': 'bg-purple-50 text-purple-700',
    Backlog: 'bg-stone-100 text-stone-600',
  };

  return (
    <li className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-tf-line/60 hover:bg-stone-50/70 transition-colors">
      <div className="min-w-0 flex-1">
        <button
          className="w-full text-left font-bold text-sm text-tf-ink hover:text-brand-dark truncate transition-colors"
          onClick={() => window.alert(`${task.id}: ${task.title}`)}
          title={`Open ${task.id}`}
        >
          {task.title}
        </button>
        <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
          <span className="font-semibold text-stone-500">{task.id}</span>
          <span>·</span>
          <span>{task.project}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold ${
            priorityStyles[task.priority] || priorityStyles.Low
          }`}
        >
          <span>{({ High: '▲', Medium: '■', Low: '▼' })[task.priority]}</span>
          {task.priority}
        </span>

        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
            statusStyles[task.status] || 'bg-stone-100 text-stone-600'
          }`}
        >
          {task.status}
        </span>

        <span className={`text-xs ml-auto sm:ml-0 whitespace-nowrap ${due.className}`}>
          {due.text}
        </span>
      </div>
    </li>
  );
}

export default function Dashboard({ onNavigate, onCreateTask, extraTasks = [] }) {
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const shown = [...extraTasks, ...tasks].filter((task) => {
    const filterMatch =
      tab === 'soon'
        ? task.due && dueInfo(task.due).className.includes('amber')
        : tab === 'high'
        ? task.priority === 'High'
        : true;
    return (
      filterMatch &&
      `${task.title} ${task.project} ${task.id}`.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <AppShell user="Nancy Rai" workspace="Product Team" onNavigate={onNavigate}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col gap-6">
        {/* Page Head */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs text-tf-ink-3 font-semibold mb-1">
              Product Team <span className="text-stone-300">/</span> Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-tf-ink">
              {greeting}, Nancy
            </h1>
            <p className="mt-1 text-sm text-tf-ink-2">
              You have <b className="text-rose-600 font-bold">2 overdue</b> and 4 due soon. Let’s
              make today count.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-tf-ink text-white font-semibold text-xs hover:bg-stone-800 transition-colors shadow-sm self-start sm:self-auto"
            onClick={onCreateTask}
          >
            <PlusIcon size={16} /> New task
          </button>
        </div>

        {/* Stats Summary Grid */}
        <section
          className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-tf-line rounded-xl shadow-xs divide-y lg:divide-y-0 lg:divide-x divide-tf-line overflow-hidden"
          aria-label="Task summary"
        >
          {stats.map((item) => (
            <div key={item.label} className="p-4 sm:p-5 flex flex-col gap-0.5">
              <span
                className={`font-display font-extrabold text-2xl sm:text-3xl tracking-tight ${
                  item.tone === 'danger'
                    ? 'text-rose-600'
                    : item.tone === 'warn'
                    ? 'text-amber-600'
                    : 'text-tf-ink'
                }`}
              >
                {item.value}
              </span>
              <span className="text-xs font-semibold text-tf-ink-2">{item.label}</span>
              <span className="text-[11px] text-tf-ink-3">{item.note}</span>
            </div>
          ))}
        </section>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)] gap-6 items-start">
          {/* Column 1: My Open Tasks */}
          <div className="min-w-0">
            <section
              className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden"
              aria-labelledby="my-open-tasks"
            >
              <div className="px-5 py-4 border-b border-tf-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
                    YOUR WORK
                  </span>
                  <h2 id="my-open-tasks" className="text-base font-display font-bold text-tf-ink">
                    My open tasks
                  </h2>
                </div>
                <div className="inline-flex gap-1 p-1 rounded-lg bg-stone-100" role="group">
                  {[
                    ['all', 'All'],
                    ['soon', 'Due soon'],
                    ['high', 'High priority'],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      aria-pressed={tab === key}
                      onClick={() => setTab(key)}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                        tab === key
                          ? 'bg-white text-tf-ink shadow-2xs font-bold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task Search Bar */}
              <label className="px-5 py-2.5 border-b border-tf-line flex items-center gap-2 text-stone-400 bg-stone-50/40">
                <SearchIcon size={15} />
                <input
                  aria-label="Search tasks"
                  placeholder="Find a task or project..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-transparent text-xs text-tf-ink placeholder:text-stone-400 focus:outline-none"
                />
              </label>

              {shown.length ? (
                <ul className="divide-y divide-tf-line/60">
                  {shown.map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-tf-ink-2">
                  <h3 className="text-sm font-bold text-tf-ink">No tasks match this view</h3>
                  <p className="text-xs text-tf-ink-3 mt-1">Try another filter or search term.</p>
                </div>
              )}

              <div className="px-5 py-3 border-t border-tf-line flex items-center justify-between text-xs text-stone-500 bg-stone-50/30">
                <button
                  className="text-xs font-bold text-brand-dark hover:underline"
                  onClick={() => onNavigate('tasks')}
                >
                  View all my tasks →
                </button>
                <span>{shown.length} shown</span>
              </div>
            </section>
          </div>

          {/* Column 2: Recent Projects & Team Activity */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Recent Projects */}
            <section
              className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden"
              aria-labelledby="recent-projects"
            >
              <div className="px-5 py-4 border-b border-tf-line flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
                    IN YOUR WORKSPACE
                  </span>
                  <h2 id="recent-projects" className="text-base font-display font-bold text-tf-ink">
                    Recent projects
                  </h2>
                </div>
                <button
                  className="text-xs font-bold text-brand-dark hover:underline"
                  onClick={() => onNavigate('projects')}
                >
                  All projects →
                </button>
              </div>

              <div className="divide-y divide-tf-line/60">
                {projects.map((project) => {
                  const percent = Math.round(
                    ((project.total - project.open) / project.total) * 100
                  );
                  return (
                    <button
                      key={project.name}
                      onClick={() => onNavigate('project-board')}
                      aria-label={`Open ${project.name} project board`}
                      className="w-full px-5 py-3.5 flex items-center gap-3 text-left hover:bg-stone-50/70 transition-colors group"
                    >
                      <span
                        className={`w-9 h-9 rounded-lg grid place-items-center font-display font-extrabold text-sm shrink-0 ${project.markBg}`}
                      >
                        {project.name[0]}
                      </span>

                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <b className="font-bold text-tf-ink group-hover:text-brand-dark transition-colors truncate">
                            {project.name}
                          </b>
                          <small className="text-stone-400 font-normal">{project.open} open</small>
                        </div>

                        <div
                          className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden"
                          role="progressbar"
                          aria-valuenow={percent}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-label={`${project.name}, ${percent}% complete`}
                        >
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${project.barBg}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span className="flex -space-x-1.5 overflow-hidden">
                            {project.members.map((member) => (
                              <Avatar
                                key={member}
                                name={member}
                                color={colorFor(member)}
                                size="small"
                              />
                            ))}
                          </span>
                          <span>
                            {percent}% done · {project.updated}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Team Activity */}
            <section
              className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden"
              aria-labelledby="team-activity"
            >
              <div className="px-5 py-4 border-b border-tf-line flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
                    LATEST UPDATES
                  </span>
                  <h2 id="team-activity" className="text-base font-display font-bold text-tf-ink">
                    Team activity
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                </span>
              </div>

              <div className="divide-y divide-tf-line/60">
                {activity.map((item) => (
                  <div key={item.task} className="px-5 py-3 flex items-start gap-3 text-xs">
                    <Avatar name={item.who} color={colorFor(item.who)} size="small" />
                    <div className="flex-1 min-w-0">
                      <p className="text-tf-ink-2 leading-relaxed">
                        <strong className="text-tf-ink font-bold">{item.who}</strong> {item.action}{' '}
                        <button
                          className="font-bold text-brand-dark hover:underline inline"
                          onClick={() => window.alert(`Open ${item.task}`)}
                        >
                          {item.task}
                        </button>{' '}
                        {item.detail}
                      </p>
                      <time className="text-[11px] text-stone-400 mt-0.5 block">{item.time}</time>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
