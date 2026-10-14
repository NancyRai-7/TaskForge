import React, { useState } from 'react';
import { taskStatuses, teamMembers } from '../data/tasks.js';

/**
 * Metric summary card list displayed at the top of the board
 */
const summaries = [
  { label: 'Total tasks', value: '24', note: '↑ 4 this week', icon: '☷' },
  { label: 'In progress', value: '08', note: '33% of total', icon: '◷' },
  { label: 'Completed', value: '11', note: '↑ 3 this week', icon: '✓' },
  { label: 'Due this week', value: '05', note: '2 coming up', icon: '▣' },
];

export function SummaryCards() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6" aria-label="Project summary">
      {summaries.map((item) => (
        <article
          className="p-4 rounded-xl bg-white border border-tf-line shadow-2xs flex flex-col justify-between min-h-[90px]"
          key={item.label}
        >
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>{item.label}</span>
            <i className="w-6 h-6 rounded-md bg-stone-100 text-stone-600 not-italic grid place-items-center text-xs">
              {item.icon}
            </i>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-display font-extrabold text-2xl text-tf-ink tracking-tight">
              {item.value}
            </span>
            <small className="text-[10px] text-brand-dark font-medium">{item.note}</small>
          </div>
        </article>
      ))}
    </section>
  );
}

/**
 * Individual task card component
 */
export function TaskCard({ task, onOpen }) {
  const member = teamMembers[task.assignee] || { color: 'green' };

  const prioritySymbols = {
    Critical: '◆',
    High: '↑',
    Medium: '●',
    Low: '↓',
  };

  const priorityStyles = {
    Critical: 'bg-rose-50 text-rose-700',
    High: 'bg-rose-50 text-rose-700',
    Medium: 'bg-amber-50 text-amber-700',
    Low: 'bg-emerald-50 text-emerald-700',
  };

  return (
    <button
      className="w-full p-3 rounded-lg bg-white border border-tf-line shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all text-left flex flex-col gap-2"
      onClick={() => onOpen(task)}
      aria-label={`Task ${task.id}: ${task.title}`}
    >
      <div className="flex items-center justify-between text-[11px] text-stone-400 font-semibold">
        <span>{task.id}</span>
        <span>···</span>
      </div>

      <strong className="font-display font-bold text-xs text-tf-ink leading-snug">
        {task.title}
      </strong>

      {task.description && (
        <span className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
          {task.description}
        </span>
      )}

      <div className="flex items-center gap-1.5 flex-wrap">
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold not-italic ${
            priorityStyles[task.priority] || priorityStyles.Low
          }`}
        >
          {prioritySymbols[task.priority] || '●'} {task.priority}
        </span>
        <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-semibold">
          {task.label}
        </span>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-tf-line/50 text-[10px] text-stone-400 mt-1">
        <span>◷ {task.due || 'No due date'}</span>
        <div className="flex items-center gap-2">
          {task.comments > 0 && <span>💬 {task.comments}</span>}
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px] grid place-items-center">
            {task.assignee}
          </span>
        </div>
      </div>
    </button>
  );
}

/**
 * Quick task creation modal form
 */
export function CreateTaskForm({ defaultStatus = 'Backlog', onCancel, onCreate }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(defaultStatus);
  const [priority, setPriority] = useState('Medium');

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;

    onCreate({
      id: `WEB-${Math.floor(20 + Math.random() * 80)}`,
      title: title.trim(),
      status,
      priority,
      label: 'New',
      assignee: 'AM',
      due: 'Oct 20',
      comments: 0,
    });
  }

  return (
    <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1.5 text-xs font-bold text-tf-ink">
        <span>Task name</span>
        <input
          autoFocus
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to get done?"
          aria-label="Task name"
          className="w-full h-10 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand font-normal"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5 text-xs font-bold text-tf-ink">
          <span>Status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Select task status"
            className="w-full h-10 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand font-normal"
          >
            {taskStatuses.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold text-tf-ink">
          <span>Priority</span>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            aria-label="Select task priority"
            className="w-full h-10 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand font-normal"
          >
            {['Low', 'Medium', 'High', 'Critical'].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

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
          Create task
        </button>
      </div>
    </form>
  );
}

/**
 * Main project board view with drag/columns
 */
export default function TaskBoard({ tasks, onOpenTask, onCreateTask }) {
  const dotStyles = {
    'In progress': 'bg-sky-500',
    'In review': 'bg-amber-500',
    Done: 'bg-emerald-500',
    Backlog: 'bg-stone-400',
  };

  return (
    <section
      className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden"
      aria-label="Project task board"
    >
      {/* Board View Toolbar */}
      <div className="h-14 px-5 border-b border-tf-line flex items-center gap-3">
        <div className="flex gap-4 mr-auto text-xs font-semibold">
          <button className="text-tf-ink border-b-2 border-brand-dark py-4 font-bold flex items-center gap-1.5">
            Board{' '}
            <span className="px-1.5 py-0.5 rounded-full bg-stone-100 text-[10px] text-stone-500">
              {tasks.length}
            </span>
          </button>
          <button
            className="text-stone-500 hover:text-stone-800 py-4"
            onClick={() => window.alert('List view will be added next.')}
          >
            List
          </button>
          <button
            className="text-stone-500 hover:text-stone-800 py-4"
            onClick={() => window.alert('Activity view will be added next.')}
          >
            Activity
          </button>
        </div>

        <button
          className="h-8 px-3 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-stone-600 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
          onClick={() => window.alert('Filters: status, assignee, priority, due date')}
        >
          ☷ Filter{' '}
          <span className="px-1.5 rounded-full bg-brand-soft text-brand-dark font-bold text-[10px]">
            2
          </span>
        </button>
        <button
          className="h-8 px-3 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-stone-600 text-xs font-semibold shadow-2xs"
          onClick={() => window.alert('Sorted by latest activity')}
        >
          ↕ Sort
        </button>
      </div>

      {/* Board Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 overflow-x-auto bg-stone-50/50">
        {taskStatuses.map((status) => {
          const columnTasks = tasks.filter((task) => task.status === status);

          return (
            <section
              className="p-3 bg-white/80 rounded-xl border border-tf-line/80 flex flex-col gap-3 min-w-[220px]"
              key={status}
              aria-label={`${status} column`}
            >
              <header className="flex items-center gap-2 text-xs pb-1 border-b border-tf-line/50">
                <i
                  className={`w-2 h-2 rounded-full not-italic ${
                    dotStyles[status] || 'bg-stone-400'
                  }`}
                  aria-hidden="true"
                />
                <b className="font-bold text-tf-ink">{status}</b>
                <span className="text-stone-400 text-[11px]">{columnTasks.length}</span>
                <button
                  className="ml-auto text-stone-400 hover:text-stone-700"
                  aria-label={`Options for ${status} column`}
                >
                  ···
                </button>
              </header>

              <div className="flex flex-col gap-2.5 min-h-[120px]">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onOpen={onOpenTask} />
                ))}
              </div>

              <button
                className="w-full h-8 mt-auto rounded-lg border border-dashed border-stone-300 hover:border-brand-dark bg-transparent hover:bg-white text-stone-500 hover:text-brand-dark text-xs font-semibold transition-all flex items-center justify-center gap-1"
                onClick={() => onCreateTask(status)}
                aria-label={`Add task to ${status}`}
              >
                ＋ Add task
              </button>
            </section>
          );
        })}
      </div>
    </section>
  );
}
