import { useState } from 'react';
import { teamMembers } from '../data/tasks.js';

export default function TaskDrawer({ task, onClose }) {
  if (!task) return null;
  const member = teamMembers[task.assignee] || {
    name: task.assignee || 'Nancy Rai',
    color: 'green',
  };

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sam Kim',
      initials: 'SK',
      color: '#8471a8',
      text: "Let's make sure the mobile menu is included in this pass.",
      time: 'Yesterday at 4:12 PM',
    },
  ]);

  function handleAddComment(event) {
    event.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: 'Nancy Rai',
        initials: 'NR',
        color: '#718a50',
        text: commentText.trim(),
        time: 'Just now',
      },
    ]);
    setCommentText('');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <aside
        className="w-full max-w-lg h-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col gap-5 border-l border-tf-line animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-tf-line">
          <span>
            Website redesign <span className="text-stone-300">/</span> {task.id}
          </span>
          <button
            className="w-8 h-8 rounded-lg border border-tf-line hover:bg-stone-50 text-stone-500 hover:text-stone-900 grid place-items-center text-lg transition-colors"
            onClick={onClose}
            aria-label="Close task details"
          >
            ×
          </button>
        </div>

        <h2 id="drawer-title" className="font-display font-extrabold text-xl text-tf-ink tracking-tight">
          {task.title}
        </h2>

        <div className="flex items-center gap-2">
          <button className="h-8 px-3 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700">
            ◉ {task.status} ⌄
          </button>
          <button className="h-8 px-3 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700">
            ⚑ {task.priority} ⌄
          </button>
          <button
            className="h-8 px-2.5 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-xs font-bold text-stone-500"
            aria-label="More task options"
          >
            ···
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3 border-y border-tf-line text-xs">
          <div>
            <small className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">
              Assignee
            </small>
            <span className="flex items-center gap-2 font-semibold text-tf-ink">
              <span
                className="w-5 h-5 rounded-full text-white text-[9px] font-bold grid place-items-center"
                style={{ backgroundColor: '#718a50' }}
              >
                {task.assignee || 'NR'}
              </span>
              {member.name}
            </span>
          </div>

          <div>
            <small className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">
              Due date
            </small>
            <span className="font-semibold text-tf-ink">
              ▣ {task.due ? `${task.due}, 2026` : 'No due date'}
            </span>
          </div>

          <div>
            <small className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">
              Priority
            </small>
            <span className="font-semibold text-tf-ink">{task.priority}</span>
          </div>

          <div>
            <small className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">
              Labels
            </small>
            <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-xs font-semibold inline-block">
              {task.label || 'Feature'}
            </span>
          </div>
        </div>

        <section className="flex flex-col gap-1.5">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Description
          </h3>
          <p className="text-xs text-tf-ink-2 leading-relaxed bg-stone-50 p-3 rounded-lg border border-tf-line/60">
            {task.description ||
              'Add a short description to give your team more context about this task.'}
          </p>
        </section>

        <section className="flex flex-col gap-2 pt-2 border-t border-tf-line">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Activity</h3>
          <div className="flex items-start gap-2.5 text-xs text-stone-600">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold grid place-items-center shrink-0">
              JL
            </span>
            <div>
              <p>
                <b>Jordan Lee</b> moved this task to <b>{task.status}</b>
              </p>
              <small className="text-stone-400">Today at 10:42 AM</small>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-stone-600">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold grid place-items-center shrink-0">
              AM
            </span>
            <div>
              <p>
                <b>Alex Morgan</b> added this task
              </p>
              <small className="text-stone-400">Yesterday at 4:18 PM</small>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3 pt-2 border-t border-tf-line mt-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Comments
            </h3>
            <span className="px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-600 font-bold text-[10px]">
              {comments.length}
            </span>
          </div>

          <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2.5 text-xs">
                <span
                  className="w-6 h-6 rounded-full text-white text-[10px] font-bold grid place-items-center shrink-0 shadow-2xs"
                  style={{ backgroundColor: c.color }}
                >
                  {c.initials}
                </span>
                <div className="flex-1 bg-stone-50 p-2.5 rounded-lg border border-tf-line/50">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <b className="text-tf-ink">{c.author}</b>
                    <small className="text-stone-400">{c.time}</small>
                  </div>
                  <p className="text-stone-700 leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="flex gap-2 mt-2" onSubmit={handleAddComment}>
            <input
              placeholder="Write a comment..."
              aria-label="Write a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 h-9 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="h-9 px-4 rounded-lg bg-tf-ink disabled:bg-stone-200 text-white disabled:text-stone-400 text-xs font-bold transition-colors"
            >
              Send
            </button>
          </form>
        </section>
      </aside>
    </div>
  );
}
