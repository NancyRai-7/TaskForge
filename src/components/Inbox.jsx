import { useEffect, useMemo, useState } from 'react';
import AppShell, { Icon } from './AppShell.jsx';
import {
  CheckSquareIcon,
  MessageSquareIcon,
  AtSignIcon,
  ClockIcon,
  ArrowLeftRightIcon,
  CheckIcon,
  CheckCircleIcon,
  SearchIcon,
} from './Icons.jsx';

export const initialNotifications = [
  {
    id: 'notif-1',
    type: 'assignment',
    title: 'Assigned to TF-142',
    summary: 'Arun Shah assigned you to Implement refresh-token rotation',
    details:
      'Assigned as lead developer. Please ensure refresh token rotation conforms to RFC 6749 and handles concurrent client tabs gracefully.',
    actor: { name: 'Arun Shah', initials: 'AS', color: '#718a50' },
    project: 'Auth & Security',
    taskId: 'TF-142',
    taskTitle: 'Implement refresh-token rotation',
    taskPriority: 'High',
    taskStatus: 'In progress',
    taskDue: '2026-10-14',
    timestamp: '10 min ago',
    date: '2026-10-14T16:30:00',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'mention',
    title: 'Mentioned in TF-160',
    summary: 'Sam Kim mentioned you in Add keyboard "Move to" action on task cards',
    details:
      '@Nancy Rai should we default keyboard focus to the next column or prompt with a quick shortcut overlay? Let me know your preference before sprint review.',
    actor: { name: 'Sam Kim', initials: 'SK', color: '#8471a8' },
    project: 'Web App',
    taskId: 'TF-160',
    taskTitle: "Add keyboard 'Move to' action on task cards",
    taskPriority: 'Low',
    taskStatus: 'Backlog',
    taskDue: '2026-10-22',
    timestamp: '45 min ago',
    date: '2026-10-14T15:55:00',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'comment',
    title: 'New comment on TF-151',
    summary: 'Mina Lama commented on Design empty states for the project board',
    details:
      '“I updated the illustration styles in Figma to match our lime and forest palette. Empty board, zero search results, and archived states are ready for review.”',
    actor: { name: 'Mina Lama', initials: 'ML', color: '#b2744f' },
    project: 'Web App',
    taskId: 'TF-151',
    taskTitle: 'Design empty states for the project board',
    taskPriority: 'Medium',
    taskStatus: 'In progress',
    taskDue: '2026-10-16',
    timestamp: '2 hours ago',
    date: '2026-10-14T14:40:00',
    read: false,
  },
  {
    id: 'notif-4',
    type: 'due_date',
    title: 'Task due today',
    summary: 'TF-142: Implement refresh-token rotation is due today',
    details:
      'Scheduled reminder: This high-priority item in Auth & Security is scheduled for completion by the end of today (Oct 14, 2026).',
    actor: { name: 'TaskForge Bot', initials: 'TF', color: '#263126' },
    project: 'Auth & Security',
    taskId: 'TF-142',
    taskTitle: 'Implement refresh-token rotation',
    taskPriority: 'High',
    taskStatus: 'In progress',
    taskDue: '2026-10-14',
    timestamp: 'Today at 9:00 AM',
    date: '2026-10-14T09:00:00',
    read: false,
  },
  {
    id: 'notif-5',
    type: 'status_change',
    title: 'Status changed on TF-138',
    summary: 'Arun Shah moved Write integration tests for task status endpoint to In review',
    details:
      'Status changed from "In progress" to "In review". Integration suite covers 400 validation, 404 missing tasks, and 409 concurrency conflicts.',
    actor: { name: 'Arun Shah', initials: 'AS', color: '#718a50' },
    project: 'API Platform',
    taskId: 'TF-138',
    taskTitle: 'Write integration tests for task status endpoint',
    taskPriority: 'High',
    taskStatus: 'In review',
    taskDue: '2026-10-12',
    timestamp: 'Yesterday at 4:15 PM',
    date: '2026-10-13T16:15:00',
    read: true,
  },
  {
    id: 'notif-6',
    type: 'comment',
    title: 'New comment on TF-127',
    summary: 'Sita Karki commented on Configure reminder retry policy',
    details:
      '“Exponential backoff with jitter is configured for Hangfire background jobs. Maximum 3 retries before dead-lettering.”',
    actor: { name: 'Sita Karki', initials: 'SK', color: '#527b76' },
    project: 'API Platform',
    taskId: 'TF-127',
    taskTitle: 'Configure reminder retry policy',
    taskPriority: 'Medium',
    taskStatus: 'Backlog',
    taskDue: '2026-10-20',
    timestamp: '2 days ago',
    date: '2026-10-12T11:20:00',
    read: true,
  },
  {
    id: 'notif-7',
    type: 'status_change',
    title: 'Task completed',
    summary: 'Set up the project workspace was marked Done',
    details:
      'Nancy Rai completed workspace scaffolding, CI pipeline checks, and developer onboarding documentation.',
    actor: { name: 'Nancy Rai', initials: 'NR', color: '#63804b' },
    project: 'Web App',
    taskId: 'TF-119',
    taskTitle: 'Set up the project workspace',
    taskPriority: 'Low',
    taskStatus: 'Done',
    taskDue: '2026-10-13',
    timestamp: '3 days ago',
    date: '2026-10-11T17:00:00',
    read: true,
  },
  {
    id: 'notif-8',
    type: 'assignment',
    title: 'Assigned to TF-151',
    summary: 'Jordan Lee assigned you to Design empty states for the project board',
    details:
      'Assigned as product design partner. Coordinate with frontend on illustration assets and responsive layouts.',
    actor: { name: 'Jordan Lee', initials: 'JL', color: '#578393' },
    project: 'Web App',
    taskId: 'TF-151',
    taskTitle: 'Design empty states for the project board',
    taskPriority: 'Medium',
    taskStatus: 'In progress',
    taskDue: '2026-10-16',
    timestamp: '4 days ago',
    date: '2026-10-10T10:00:00',
    read: true,
  },
];

const STORAGE_KEY = 'taskforge-inbox-notifications';

const typeMeta = {
  assignment: { label: 'Assignment', icon: CheckSquareIcon, badgeColor: 'bg-emerald-100 text-emerald-800' },
  comment: { label: 'Comment', icon: MessageSquareIcon, badgeColor: 'bg-amber-100 text-amber-800' },
  mention: { label: 'Mention', icon: AtSignIcon, badgeColor: 'bg-purple-100 text-purple-800' },
  due_date: { label: 'Due date', icon: ClockIcon, badgeColor: 'bg-rose-100 text-rose-800' },
  status_change: { label: 'Status', icon: ArrowLeftRightIcon, badgeColor: 'bg-sky-100 text-sky-800' },
};

export default function Inbox({ onNavigate, onOpenProject, onOpenTask }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [activeTab, setActiveTab] = useState('all');
  const [typeFilter, setTypeFilter] = useState('All types');
  const [projectFilter, setProjectFilter] = useState('All projects');
  const [query, setQuery] = useState('');
  const [previewItem, setPreviewItem] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
      window.dispatchEvent(new Event('taskforge-inbox-updated'));
    } catch (e) {
      console.error('Failed to save inbox notifications to localStorage', e);
    }
  }, [notifications]);

  const counts = useMemo(() => {
    const unread = notifications.filter((n) => !n.read).length;
    const assignments = notifications.filter((n) => n.type === 'assignment').length;
    const discussions = notifications.filter(
      (n) => n.type === 'comment' || n.type === 'mention'
    ).length;
    const updates = notifications.filter(
      (n) => n.type === 'status_change' || n.type === 'due_date'
    ).length;
    return {
      total: notifications.length,
      unread,
      assignments,
      discussions,
      updates,
    };
  }, [notifications]);

  const visibleNotifications = useMemo(() => {
    return notifications.filter((item) => {
      if (activeTab === 'unread' && item.read) return false;

      if (typeFilter !== 'All types') {
        const map = {
          Assignments: 'assignment',
          Comments: 'comment',
          Mentions: 'mention',
          'Due dates': 'due_date',
          'Status changes': 'status_change',
        };
        if (item.type !== map[typeFilter]) return false;
      }

      if (projectFilter !== 'All projects' && item.project !== projectFilter) {
        return false;
      }

      if (query.trim()) {
        const term = query.toLowerCase();
        const searchable =
          `${item.title} ${item.summary} ${item.details} ${item.actor.name} ${item.project} ${item.taskId} ${item.taskTitle}`.toLowerCase();
        if (!searchable.includes(term)) return false;
      }

      return true;
    });
  }, [notifications, activeTab, typeFilter, projectFilter, query]);

  function toggleRead(id, event) {
    if (event) event.stopPropagation();
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: !item.read } : item))
    );
  }

  function markAsRead(id, event) {
    if (event) event.stopPropagation();
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  }

  function markAllAsRead() {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }

  function resetSampleNotifications() {
    setNotifications(initialNotifications);
    setActiveTab('all');
    setTypeFilter('All types');
    setProjectFilter('All projects');
    setQuery('');
  }

  function handleOpenProject(projectName, event) {
    if (event) event.stopPropagation();
    if (onOpenProject) {
      onOpenProject(projectName);
    } else if (onNavigate) {
      onNavigate('projects');
    }
  }

  function handleOpenTask(notification, event) {
    if (event) event.stopPropagation();
    markAsRead(notification.id);
    setPreviewItem(notification);
    if (onOpenTask) {
      onOpenTask({
        id: notification.taskId,
        title: notification.taskTitle,
        project: notification.project,
        status: notification.taskStatus,
        priority: notification.taskPriority,
        due: notification.taskDue,
      });
    }
  }

  return (
    <AppShell
      active="inbox"
      unread={counts.unread}
      user="Nancy Rai"
      workspace="Product Team"
      showSearch={false}
      onNavigate={onNavigate}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col gap-5">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs text-tf-ink-3 font-semibold mb-1">
              Product Team <span className="text-stone-300">/</span> Inbox
            </div>
            <p className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
              NOTIFICATIONS &amp; ACTIVITY
            </p>
            <h1 id="inbox-title" className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-tf-ink mt-0.5">
              Inbox
            </h1>
            <p className="mt-1 text-sm text-tf-ink-2">
              {counts.unread > 0
                ? `${counts.unread} unread notification${counts.unread === 1 ? '' : 's'} need your attention.`
                : 'You’re all caught up.'}
            </p>
          </div>
          <div className="flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <label className="relative flex items-center text-stone-400 focus-within:text-brand min-w-0 sm:w-64">
              <SearchIcon size={15} className="absolute left-3 pointer-events-none" />
              <input
                type="search"
                aria-label="Search notifications"
                placeholder="Search notifications..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-tf-line bg-white text-sm text-tf-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </label>
            <button
              onClick={markAllAsRead}
              disabled={counts.unread === 0}
              aria-label="Mark all notifications as read"
              className={`inline-flex h-10 items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold transition-all ${
                counts.unread === 0
                  ? 'border border-tf-line bg-stone-50 text-stone-300 cursor-not-allowed'
                  : 'border border-tf-line bg-white hover:bg-stone-50 text-tf-ink shadow-2xs'
              }`}
            >
              <CheckIcon size={15} /> Mark all as read
            </button>
          </div>
        </header>

        {/* Main Inbox Panel */}
        <section
          className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden"
          aria-labelledby="inbox-title"
        >
          {/* All vs Unread Tabs */}
          <nav
            className="flex items-center gap-4 sm:gap-6 px-5 border-b border-tf-line overflow-x-auto text-xs"
            aria-label="Filter by read state"
          >
            <button
              onClick={() => setActiveTab('all')}
              aria-current={activeTab === 'all' ? 'page' : undefined}
              className={`relative py-3.5 flex items-center gap-2 font-bold whitespace-nowrap transition-colors ${
                activeTab === 'all'
                  ? 'text-tf-ink border-b-2 border-brand-dark'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              All notifications
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === 'all'
                    ? 'bg-brand-soft text-brand-dark font-extrabold'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {counts.total}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              aria-current={activeTab === 'unread' ? 'page' : undefined}
              className={`relative py-3.5 flex items-center gap-2 font-bold whitespace-nowrap transition-colors ${
                activeTab === 'unread'
                  ? 'text-tf-ink border-b-2 border-brand-dark'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Unread
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  counts.unread > 0
                    ? 'bg-amber-100 text-amber-800 font-bold animate-pulse'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {counts.unread}
              </span>
            </button>
          </nav>

          {/* Secondary Filters Bar */}
          <div className="px-5 py-2.5 border-b border-tf-line flex items-center gap-3 text-xs bg-stone-50/40 flex-wrap">
            <span className="text-stone-500 font-semibold">Filter:</span>
            <select
              aria-label="Filter by notification type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-8 px-2.5 rounded-md border border-tf-line bg-white text-xs text-tf-ink focus:outline-none focus:border-brand"
            >
              <option>All types</option>
              <option>Assignments</option>
              <option>Comments</option>
              <option>Mentions</option>
              <option>Due dates</option>
              <option>Status changes</option>
            </select>

            <select
              aria-label="Filter by project"
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="h-8 px-2.5 rounded-md border border-tf-line bg-white text-xs text-tf-ink focus:outline-none focus:border-brand"
            >
              <option>All projects</option>
              <option>Web App</option>
              <option>API Platform</option>
              <option>Auth &amp; Security</option>
            </select>

            {(typeFilter !== 'All types' || projectFilter !== 'All projects' || query) && (
              <button
                className="text-xs font-bold text-brand-dark hover:underline"
                onClick={() => {
                  setTypeFilter('All types');
                  setProjectFilter('All projects');
                  setQuery('');
                }}
              >
                Reset filters
              </button>
            )}

            <span className="ml-auto text-stone-400 text-xs font-medium">
              {visibleNotifications.length} notification
              {visibleNotifications.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Notification List */}
          {visibleNotifications.length > 0 ? (
            <ul className="space-y-3 p-4 sm:p-5 bg-stone-50/50" role="list">
              {visibleNotifications.map((item) => {
                const meta = typeMeta[item.type] || typeMeta.assignment;
                const isUnread = !item.read;

                return (
                  <li
                    key={item.id}
                    aria-label={`${isUnread ? 'Unread notification: ' : 'Notification: '} ${item.summary}`}
                    className={`grid grid-cols-[12px_40px_minmax(0,1fr)] sm:grid-cols-[16px_44px_minmax(0,1fr)] gap-x-3 sm:gap-x-4 gap-y-2.5 rounded-xl border p-4 sm:p-5 transition-colors ${
                      isUnread
                        ? 'bg-white border-brand/30 shadow-[0_2px_10px_rgba(54,73,45,0.06)]'
                        : 'bg-white border-tf-line hover:border-stone-300'
                    }`}
                  >
                    {/* Read indicator toggle */}
                    <button
                      className="w-4 h-8 flex items-center justify-center shrink-0 text-stone-300 hover:text-brand-dark transition-colors"
                      onClick={(e) => toggleRead(item.id, e)}
                      aria-label={isUnread ? 'Mark as read' : 'Mark as unread'}
                      title={isUnread ? 'Mark as read' : 'Mark as unread'}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          isUnread ? 'bg-brand ring-4 ring-brand/20' : 'bg-stone-300'
                        }`}
                      />
                    </button>

                    {/* Actor Avatar with Type Badge */}
                    <div className="relative shrink-0 self-start mt-1">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-xs"
                        style={{ backgroundColor: item.actor.color }}
                        title={item.actor.name}
                      >
                        {item.actor.initials}
                      </div>
                      <span
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full grid place-items-center ring-2 ring-white shadow-xs ${meta.badgeColor}`}
                        title={meta.label}
                        aria-hidden="true"
                      >
                        <meta.icon size={9} />
                      </span>
                    </div>

                    {/* Main Content */}
                    <div className="col-start-3 min-w-0 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <p className="min-w-0 text-xs sm:text-sm leading-5 text-tf-ink-2">
                          <span className="font-bold text-tf-ink">{item.actor.name}</span>
                          <span> {item.title}</span>
                        </p>
                        <time className="shrink-0 text-xs text-stone-400">{item.timestamp}</time>
                      </div>

                      <button
                        className="text-left font-bold text-base sm:text-lg leading-snug text-tf-ink hover:text-brand-dark transition-colors break-words"
                        onClick={(e) => handleOpenTask(item, e)}
                        title={`View task details for ${item.taskId}`}
                      >
                        {item.taskTitle}
                      </button>

                      {item.details && (
                        <p className="text-sm leading-5 text-stone-600 line-clamp-2">
                          {item.details}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-1 text-xs flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 font-semibold">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.taskPriority === 'High'
                                ? 'bg-rose-500'
                                : item.taskPriority === 'Medium'
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                          />
                          {item.taskId}
                        </span>

                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer transition-colors"
                          onClick={(e) => handleOpenProject(item.project, e)}
                        >
                          ▤ {item.project}
                        </button>

                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold ${meta.badgeColor}`}>
                          {meta.label}
                        </span>
                      </div>
                    </div>

                    {/* One clear action, placed beneath the notification content */}
                    <div className="col-start-3 flex items-center gap-2">
                      <button
                        className="px-3 py-2 rounded-lg bg-tf-ink hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-colors"
                        onClick={(e) => handleOpenTask(item, e)}
                        aria-label={`Open task ${item.taskId}`}
                      >
                        View task <span aria-hidden="true">↗</span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-12 text-center text-stone-500 flex flex-col items-center">
              <span className="w-12 h-12 rounded-2xl bg-brand-soft text-brand-dark grid place-items-center mb-3">
                {activeTab === 'unread' && counts.unread === 0 ? (
                  <CheckCircleIcon size={24} className="text-emerald-700" />
                ) : (
                  <SearchIcon size={24} className="text-stone-400" />
                )}
              </span>
              <h3 className="text-base font-bold text-tf-ink">
                {activeTab === 'unread' && counts.unread === 0
                  ? "You're all caught up!"
                  : 'No notifications found'}
              </h3>
              <p className="text-xs text-stone-400 mt-1 max-w-sm">
                {activeTab === 'unread' && counts.unread === 0
                  ? 'There are no unread notifications right now. Great work staying on top of your team’s updates.'
                  : 'We couldn’t find any notifications matching your current filters or search term.'}
              </p>
              <div className="mt-4">
                <button
                  className="px-4 py-2 rounded-lg bg-tf-ink text-white text-xs font-bold hover:bg-stone-800 transition-colors shadow-xs"
                  onClick={() => {
                    setActiveTab('all');
                    setTypeFilter('All types');
                    setProjectFilter('All projects');
                    setQuery('');
                  }}
                >
                  {activeTab === 'unread' && counts.unread === 0
                    ? 'View all notifications'
                    : 'Clear all filters'}
                </button>
              </div>
            </div>
          )}

          {/* Panel Footer */}
          <footer className="px-5 py-3 border-t border-tf-line flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500 bg-stone-50/30">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Showing {visibleNotifications.length} of {notifications.length} notifications · Saved
              locally
            </span>
            <button
              className="text-xs font-bold text-stone-500 hover:text-brand-dark transition-colors"
              onClick={resetSampleNotifications}
              title="Reset notifications back to default sample data"
            >
              Reset sample notifications
            </button>
          </footer>
        </section>
      </div>

      {/* Task Preview Drawer Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs"
          onMouseDown={(e) => e.target === e.currentTarget && setPreviewItem(null)}
        >
          <aside
            className="w-full max-w-md h-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col gap-5 border-l border-tf-line animate-in slide-in-from-right duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-task-title"
          >
            <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-tf-line">
              <span>
                {previewItem.project} <span className="text-stone-300">/</span> {previewItem.taskId}
              </span>
              <button
                className="w-8 h-8 rounded-lg border border-tf-line hover:bg-stone-50 text-stone-500 hover:text-stone-900 grid place-items-center text-lg transition-colors"
                onClick={() => setPreviewItem(null)}
                aria-label="Close task preview"
              >
                ×
              </button>
            </div>

            <div className="p-3 rounded-lg bg-brand-soft/70 border border-brand/20 text-xs text-brand-dark leading-relaxed">
              <b>{previewItem.actor.name}</b>{' '}
              {previewItem.summary.replace(previewItem.actor.name, '').trim()}
            </div>

            <h2
              id="preview-task-title"
              className="font-display font-extrabold text-xl text-tf-ink tracking-tight"
            >
              {previewItem.taskTitle}
            </h2>

            <div className="grid grid-cols-2 gap-3 py-3 border-y border-tf-line text-xs">
              <div>
                <small className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                  Project
                </small>
                <span className="font-semibold text-tf-ink">▤ {previewItem.project}</span>
              </div>
              <div>
                <small className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                  Status
                </small>
                <span className="font-semibold text-brand-dark">◉ {previewItem.taskStatus}</span>
              </div>
              <div>
                <small className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                  Priority
                </small>
                <span className="font-semibold text-tf-ink">
                  {previewItem.taskPriority === 'High'
                    ? '▲'
                    : previewItem.taskPriority === 'Medium'
                    ? '■'
                    : '▼'}{' '}
                  {previewItem.taskPriority}
                </span>
              </div>
              <div>
                <small className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                  Due Date
                </small>
                <span className="font-semibold text-tf-ink">
                  ▣ {previewItem.taskDue || 'No due date'}
                </span>
              </div>
            </div>

            <section className="flex flex-col gap-1.5">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Notification Context
              </h3>
              <p className="text-xs text-tf-ink-2 leading-relaxed bg-stone-50 p-3 rounded-lg border border-tf-line/60">
                {previewItem.details}
              </p>
            </section>

            <section className="flex flex-col gap-1.5">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Timeline
              </h3>
              <p className="text-xs text-stone-600">
                {previewItem.title} by{' '}
                <strong className="text-tf-ink">{previewItem.actor.name}</strong> ·{' '}
                {previewItem.timestamp}
              </p>
            </section>

            <div className="mt-auto pt-4 border-t border-tf-line flex gap-2">
              <button
                className="flex-1 h-9 px-3 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors"
                onClick={() => {
                  toggleRead(previewItem.id);
                  setPreviewItem((prev) => ({ ...prev, read: !prev.read }));
                }}
              >
                {previewItem.read ? 'Mark unread ↺' : 'Mark read ✓'}
              </button>
              <button
                className="flex-1 h-9 px-3 rounded-lg bg-tf-ink hover:bg-stone-800 text-white text-xs font-bold transition-colors shadow-xs"
                onClick={() => {
                  setPreviewItem(null);
                  handleOpenProject(previewItem.project);
                }}
              >
                Open board →
              </button>
            </div>
          </aside>
        </div>
      )}
    </AppShell>
  );
}
