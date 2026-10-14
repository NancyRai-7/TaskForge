import React, { useEffect, useMemo, useState } from 'react';
import AppShell from './AppShell.jsx';
import {
  ListTodoIcon,
  AlertCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  PlusIcon,
  SearchIcon,
} from './Icons.jsx';

export function CreateMyTaskForm({ onCancel, onCreate }) {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('Web App');
  const [priority, setPriority] = useState('Medium');
  const [due, setDue] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;

    onCreate({
      title: title.trim(),
      project,
      priority,
      due: due || null,
      description: description.trim(),
    });
  }

  return (
    <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
      <p className="p-3 rounded-lg bg-brand-soft/80 text-brand-dark text-xs leading-relaxed">
        This task will be assigned to <b>Nancy Rai</b> and added to your personal work stream.
      </p>

      <label className="flex flex-col gap-1.5 text-xs font-bold text-tf-ink">
        <span>
          Task name <span className="text-rose-600">*</span>
        </span>
        <input
          autoFocus
          required
          maxLength={160}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What do you need to do?"
          aria-label="Task name"
          className="w-full h-10 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand font-normal"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5 text-xs font-bold text-tf-ink">
          <span>Project</span>
          <select
            value={project}
            onChange={(event) => setProject(event.target.value)}
            aria-label="Select project"
            className="w-full h-10 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand font-normal"
          >
            <option>Web App</option>
            <option>API Platform</option>
            <option>Auth &amp; Security</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold text-tf-ink">
          <span>Priority</span>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            aria-label="Select priority"
            className="w-full h-10 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand font-normal"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-xs font-bold text-tf-ink">
        <span>
          Due date <small className="text-stone-400 font-normal ml-1">Optional</small>
        </span>
        <input
          type="date"
          min="2026-10-14"
          value={due}
          onChange={(event) => setDue(event.target.value)}
          aria-label="Task due date"
          className="w-full h-10 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand font-normal"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-bold text-tf-ink">
        <span>
          Description <small className="text-stone-400 font-normal ml-1">Optional</small>
        </span>
        <textarea
          maxLength={1000}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add a little context for yourself or your team..."
          aria-label="Task description"
          rows={3}
          className="w-full p-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-y font-normal"
        />
      </label>

      <div className="flex justify-end gap-2.5 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="h-9 px-4 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-xs font-bold text-stone-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-9 px-4 rounded-lg bg-tf-ink hover:bg-stone-800 text-white text-xs font-bold transition-colors shadow-xs"
        >
          Create my task
        </button>
      </div>
    </form>
  );
}

const today = '2026-10-14';

const startingTasks = [
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
    title: 'Configure reminder retry policy',
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
  {
    id: 'TF-119',
    title: 'Set up the project workspace',
    project: 'Web App',
    status: 'Done',
    priority: 'Low',
    due: '2026-10-13',
  },
];

const tabs = [
  { id: 'all', label: 'All tasks' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'soon', label: 'Due soon' },
  { id: 'completed', label: 'Completed' },
];

function dueDetails(date, status) {
  if (!date) return { label: 'No due date', type: 'none', style: 'text-stone-400' };
  const delta = Math.round(
    (new Date(`${date}T00:00:00`) - new Date(`${today}T00:00:00`)) / 86400000
  );
  if (status !== 'Done' && delta < 0) {
    return {
      label: `Overdue by ${-delta} day${delta === -1 ? '' : 's'}`,
      type: 'overdue',
      style: 'text-rose-600 font-bold',
    };
  }
  if (delta === 0) return { label: 'Due today', type: 'today', style: 'text-amber-600 font-bold' };
  if (delta > 0 && delta <= 3) {
    return { label: `Due in ${delta} days`, type: 'soon', style: 'text-amber-600 font-semibold' };
  }
  return {
    label: new Date(`${date}T00:00:00`).toLocaleDateString('en', {
      month: 'short',
      day: 'numeric',
    }),
    type: 'normal',
    style: 'text-stone-500',
  };
}

export default function MyTasks({ onNavigate }) {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('taskforge-my-tasks')) || startingTasks;
    } catch {
      return startingTasks;
    }
  });

  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('All priorities');
  const [project, setProject] = useState('All projects');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('taskforge-my-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const counts = useMemo(
    () => ({
      open: tasks.filter((task) => task.status !== 'Done').length,
      overdue: tasks.filter(
        (task) => task.status !== 'Done' && dueDetails(task.due, task.status).type === 'overdue'
      ).length,
      soon: tasks.filter(
        (task) =>
          task.status !== 'Done' &&
          ['today', 'soon'].includes(dueDetails(task.due, task.status).type)
      ).length,
      completed: tasks.filter((task) => task.status === 'Done').length,
    }),
    [tasks]
  );

  const visibleTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const due = dueDetails(task.due, task.status);
        const matchesTab =
          activeTab === 'overdue'
            ? due.type === 'overdue' && task.status !== 'Done'
            : activeTab === 'soon'
            ? ['today', 'soon'].includes(due.type) && task.status !== 'Done'
            : activeTab === 'completed'
            ? task.status === 'Done'
            : task.status !== 'Done';
        const matchesQuery = `${task.title} ${task.project} ${task.id}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return (
          matchesTab &&
          matchesQuery &&
          (priority === 'All priorities' || task.priority === priority) &&
          (project === 'All projects' || task.project === project)
        );
      })
      .sort((a, b) => {
        if (!a.due) return 1;
        if (!b.due) return -1;
        return a.due.localeCompare(b.due);
      });
  }, [tasks, activeTab, query, priority, project]);

  function toggleComplete(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Done' ? 'In progress' : 'Done' }
          : task
      )
    );
  }

  function createTask(taskDetails) {
    const nextNumber =
      Math.max(160, ...tasks.map((task) => Number(task.id.replace('TF-', '')) || 0)) + 1;
    setTasks((current) => [
      { id: `TF-${nextNumber}`, ...taskDetails, status: 'Backlog', assignee: 'Nancy Rai' },
      ...current,
    ]);
    setActiveTab('all');
    setQuery('');
    setPriority('All priorities');
    setProject('All projects');
    setShowCreateForm(false);
  }

  const priorityStyles = {
    Critical: 'bg-rose-50 text-rose-700 border-rose-200/60',
    High: 'bg-rose-50 text-rose-700 border-rose-200/60',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200/60',
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  };

  const statusStyles = {
    'In progress': 'bg-brand-soft text-brand-dark',
    'In review': 'bg-purple-50 text-purple-700',
    Done: 'bg-emerald-50 text-emerald-700',
    Backlog: 'bg-stone-100 text-stone-600',
  };

  return (
    <AppShell active="tasks" user="Nancy Rai" workspace="Product Team" onNavigate={onNavigate}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs text-tf-ink-3 font-semibold mb-1">
              Product Team <span className="text-stone-300">/</span> My Tasks
            </div>
            <p className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
              YOUR PERSONAL WORKSPACE
            </p>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-tf-ink mt-0.5">
              My Tasks
            </h1>
            <p className="mt-1 text-sm text-tf-ink-2">
              Your assigned work, deadlines, and next steps—all in one place.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-tf-ink text-white font-semibold text-xs hover:bg-stone-800 transition-colors shadow-sm self-start sm:self-auto"
            onClick={() => setShowCreateForm(true)}
          >
            <PlusIcon size={16} /> New task
          </button>
        </header>

        {/* 4 Summary Stat Cards */}
        <section
          className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-tf-line rounded-xl shadow-xs divide-y lg:divide-y-0 lg:divide-x divide-tf-line overflow-hidden"
          aria-label="My task summary"
        >
          <article className="p-4 sm:p-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-brand-soft text-brand-dark grid place-items-center shrink-0">
              <ListTodoIcon size={20} />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <b className="font-display font-extrabold text-2xl tracking-tight text-tf-ink">
                  {counts.open}
                </b>
                <span className="text-xs font-semibold text-tf-ink-2">Open tasks</span>
              </div>
              <small className="text-[11px] text-tf-ink-3">Assigned to you</small>
            </div>
          </article>

          <article className="p-4 sm:p-5 flex items-center gap-3.5 bg-rose-50/20">
            <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 grid place-items-center shrink-0">
              <AlertCircleIcon size={20} />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <b className="font-display font-extrabold text-2xl tracking-tight text-rose-600">
                  {counts.overdue}
                </b>
                <span className="text-xs font-semibold text-rose-800">Overdue</span>
              </div>
              <small className="text-[11px] text-rose-600/80">Needs attention</small>
            </div>
          </article>

          <article className="p-4 sm:p-5 flex items-center gap-3.5 bg-amber-50/20">
            <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 grid place-items-center shrink-0">
              <ClockIcon size={20} />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <b className="font-display font-extrabold text-2xl tracking-tight text-amber-600">
                  {counts.soon}
                </b>
                <span className="text-xs font-semibold text-amber-800">Due soon</span>
              </div>
              <small className="text-[11px] text-amber-600/80">Next 3 days</small>
            </div>
          </article>

          <article className="p-4 sm:p-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center shrink-0">
              <CheckCircleIcon size={20} />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <b className="font-display font-extrabold text-2xl tracking-tight text-emerald-700">
                  {counts.completed}
                </b>
                <span className="text-xs font-semibold text-tf-ink-2">Completed</span>
              </div>
              <small className="text-[11px] text-tf-ink-3">You finished</small>
            </div>
          </article>
        </section>

        {/* Task Overview Panel */}
        <section
          className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden"
          aria-labelledby="mytasks-list-heading"
        >
          {/* Panel Head */}
          <div className="px-5 py-4 border-b border-tf-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
                TASK OVERVIEW
              </p>
              <h2 id="mytasks-list-heading" className="text-base font-display font-bold text-tf-ink">
                Assigned to me
              </h2>
            </div>
            <label className="relative flex items-center gap-2 max-w-xs w-full text-stone-400">
              <SearchIcon size={15} className="absolute left-3 pointer-events-none" />
              <input
                aria-label="Search my tasks"
                placeholder="Search my tasks..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-tf-line bg-stone-50/70 text-tf-ink text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </label>
          </div>

          {/* Filter Tabs */}
          <nav
            className="flex items-center gap-4 sm:gap-6 px-5 border-b border-tf-line overflow-x-auto text-xs"
            aria-label="Task status filters"
          >
            {tabs.map((tab) => {
              const isCurrent = activeTab === tab.id;
              const count = tab.id === 'all' ? counts.open : counts[tab.id];

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`relative py-3.5 flex items-center gap-2 font-bold whitespace-nowrap transition-colors ${
                    isCurrent
                      ? 'text-tf-ink border-b-2 border-brand-dark'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isCurrent ? 'bg-brand-soft text-brand-dark font-extrabold' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Secondary Filter Dropdowns */}
          <div className="px-5 py-2.5 border-b border-tf-line flex items-center gap-3 text-xs bg-stone-50/40 flex-wrap">
            <span className="text-stone-500 font-semibold">Filter:</span>
            <select
              aria-label="Filter by priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="h-8 px-2.5 rounded-md border border-tf-line bg-white text-xs text-tf-ink focus:outline-none focus:border-brand"
            >
              <option>All priorities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select
              aria-label="Filter by project"
              value={project}
              onChange={(event) => setProject(event.target.value)}
              className="h-8 px-2.5 rounded-md border border-tf-line bg-white text-xs text-tf-ink focus:outline-none focus:border-brand"
            >
              <option>All projects</option>
              <option>Web App</option>
              <option>API Platform</option>
              <option>Auth &amp; Security</option>
            </select>
            <span className="ml-auto text-stone-400 text-xs font-medium">
              {visibleTasks.length} task{visibleTasks.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Task Rows List */}
          {visibleTasks.length ? (
            <ul className="divide-y divide-tf-line/60">
              {visibleTasks.map((task) => {
                const due = dueDetails(task.due, task.status);
                const isDone = task.status === 'Done';

                return (
                  <li
                    key={task.id}
                    className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3.5 hover:bg-stone-50/70 transition-colors"
                  >
                    {/* Checkbox */}
                    <button
                      className={`w-5 h-5 rounded-md border flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isDone
                          ? 'border-brand-dark bg-brand-dark text-white'
                          : 'border-stone-300 hover:border-brand-dark bg-white text-transparent'
                      }`}
                      aria-label={isDone ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}
                      onClick={() => toggleComplete(task.id)}
                    >
                      ✓
                    </button>

                    {/* Task Title & Meta */}
                    <div className="flex-1 min-w-0">
                      <button
                        className={`text-left font-bold text-sm truncate max-w-full block transition-colors ${
                          isDone
                            ? 'text-stone-400 line-through'
                            : 'text-tf-ink hover:text-brand-dark'
                        }`}
                        onClick={() => window.alert(`${task.id} · ${task.project}`)}
                      >
                        {task.title}
                      </button>
                      <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                        <span className="font-semibold text-stone-500">{task.id}</span>
                        <span>·</span>
                        <span>{task.project}</span>
                      </div>
                    </div>

                    {/* Tags & Due Date */}
                    <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold ${
                          priorityStyles[task.priority] || priorityStyles.Low
                        }`}
                      >
                        <span>{({ Critical: '◆', High: '▲', Medium: '■', Low: '▼' })[task.priority]}</span>
                        {task.priority}
                      </span>

                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          statusStyles[task.status] || 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {task.status}
                      </span>

                      <span className={`text-xs ml-auto sm:ml-0 whitespace-nowrap ${due.style}`}>
                        {due.label}
                      </span>

                      <button
                        className="w-7 h-7 rounded-md hover:bg-stone-100 text-stone-400 hover:text-stone-700 grid place-items-center font-bold text-sm transition-colors"
                        aria-label={`Toggle completion for ${task.title}`}
                        onClick={() => toggleComplete(task.id)}
                        title="Toggle status"
                      >
                        ···
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-10 text-center text-stone-500 flex flex-col items-center">
              <span className="w-10 h-10 rounded-xl bg-brand-soft text-brand-dark grid place-items-center mb-2">
                <CheckCircleIcon size={20} />
              </span>
              <h3 className="text-sm font-bold text-tf-ink">No tasks in this view</h3>
              <p className="text-xs text-stone-400 mt-1 mb-3">
                Try changing your filters or search terms.
              </p>
              <button
                className="text-xs font-bold text-brand-dark hover:underline"
                onClick={() => {
                  setActiveTab('all');
                  setPriority('All priorities');
                  setProject('All projects');
                  setQuery('');
                }}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Panel Footer */}
          <footer className="px-5 py-3 border-t border-tf-line flex items-center justify-between text-xs text-stone-500 bg-stone-50/30">
            <span>
              Showing {visibleTasks.length} of {tasks.length} tasks
            </span>
            <span className="text-stone-400">Updated just now</span>
          </footer>
        </section>
      </div>

      {/* Create Task Modal */}
      {showCreateForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs"
          onMouseDown={(event) => event.target === event.currentTarget && setShowCreateForm(false)}
        >
          <section
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-white border border-tf-line shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-my-task-title"
          >
            <header className="flex items-center justify-between pb-4 border-b border-tf-line">
              <div>
                <p className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
                  PERSONAL TASK
                </p>
                <h2 id="create-my-task-title" className="text-lg font-display font-bold text-tf-ink">
                  Create a task
                </h2>
              </div>
              <button
                className="w-8 h-8 rounded-lg border border-tf-line hover:bg-stone-50 text-stone-500 hover:text-stone-900 grid place-items-center text-lg transition-colors"
                aria-label="Close form"
                onClick={() => setShowCreateForm(false)}
              >
                ×
              </button>
            </header>
            <CreateMyTaskForm onCancel={() => setShowCreateForm(false)} onCreate={createTask} />
          </section>
        </div>
      )}
    </AppShell>
  );
}
