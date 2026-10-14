import { useEffect, useState } from 'react';
import { LogoMark } from './Icons.jsx';

const paths = {
  home: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
  tasks: 'M9 11l3 3 8-8M4 5h3M4 12h3M4 19h16',
  folder: 'M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  bell: 'M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0',
  cog: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  search: 'M21 21l-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14',
  plus: 'M12 5v14M5 12h14',
  chevron: 'M6 9l6 6 6-6',
  forge: 'M4 17h16M6 17v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M9 12V8l3-4 3 4v4',
};

export function Icon({ name, size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={paths[name] || paths.home} />
    </svg>
  );
}

export function Avatar({ name = 'Team member', color = '#63804b', size = 'normal' }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeClass = size === 'small' ? 'w-6 h-6 text-[9px]' : 'w-8 h-8 text-[11px]';

  return (
    <span
      className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-white shrink-0 border-2 border-white shadow-sm ring-1 ring-black/5`}
      style={{ backgroundColor: color }}
      title={name}
      aria-label={name}
    >
      {initials}
    </span>
  );
}

const navItems = [
  { path: 'dashboard', label: 'Dashboard', icon: 'home' },
  { path: 'tasks', label: 'My Tasks', icon: 'tasks', badge: 7 },
  { path: 'projects', label: 'Projects', icon: 'folder' },
  { path: 'inbox', label: 'Inbox', icon: 'bell' },
  { path: 'members', label: 'Members', icon: 'users', roles: ['owner', 'manager'] },
  { path: 'settings', label: 'Settings', icon: 'cog', roles: ['owner'] },
];

function getStoredUnread() {
  try {
    const raw = window.localStorage.getItem('taskforge-inbox-notifications');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((n) => !n.read).length;
      }
    }
  } catch {}
  return 4;
}

export default function AppShell({
  active = 'dashboard',
  role = 'owner',
  user = 'Nancy Rai',
  workspace = 'Product Team',
  unread,
  showSearch = true,
  onNavigate,
  children,
}) {
  const [storedUnread, setStoredUnread] = useState(getStoredUnread);

  useEffect(() => {
    const handleUpdate = () => {
      setStoredUnread(getStoredUnread());
    };
    window.addEventListener('taskforge-inbox-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('taskforge-inbox-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const effectiveUnread = typeof unread === 'number' ? unread : storedUnread;
  const items = navItems.filter((item) => !item.roles || item.roles.includes(role));
  const go = (event, destination) => {
    event.preventDefault();
    onNavigate?.(destination);
  };

  return (
    <div className="min-h-screen bg-tf-bg text-tf-ink font-sans flex flex-col md:grid md:grid-cols-[226px_minmax(0,1fr)]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex sticky top-0 h-screen p-4 bg-tf-nav text-tf-nav-ink flex-col gap-6 border-r border-stone-800/50 z-30">
        <a
          className="flex items-center gap-2.5 px-2 py-1 text-white font-display font-extrabold text-lg tracking-tight no-underline group"
          href="#dashboard"
          onClick={(event) => go(event, 'dashboard')}
          aria-label="TaskForge dashboard"
        >
          <LogoMark size={28} className="shrink-0 group-hover:scale-105 transition-transform" />
          <span>
            Task<span className="text-lime">Forge</span>
          </span>
        </a>

        <nav className="flex flex-col gap-1" aria-label="Main navigation">
          {items.map((item) => {
            const badge =
              item.path === 'inbox' ? (effectiveUnread > 0 ? effectiveUnread : null) : item.badge;
            const isCurrent = active === item.path;

            return (
              <a
                key={item.path}
                href={`#${item.path}`}
                onClick={(event) => go(event, item.path)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`min-h-[40px] px-3 flex items-center gap-3 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  isCurrent
                    ? 'bg-white/15 text-white shadow-[inset_3px_0_0_#c6f36a]'
                    : 'text-tf-nav-ink hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon name={item.icon} size={18} className="shrink-0" />
                <span className="truncate">{item.label}</span>
                {badge && (
                  <span className="ml-auto rounded-full bg-[#718c4d] text-white text-[10px] px-2 py-0.5 font-bold shadow-xs">
                    {badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto px-2 pt-4 border-t border-white/10 text-[11px] text-tf-nav-ink/70 flex items-center justify-between">
          <span>v1.0</span>
          <span>·</span>
          <span className="truncate max-w-[120px]">{workspace}</span>
        </div>
      </aside>

      {/* Main Area */}
      <div className="min-w-0 flex flex-col pb-16 md:pb-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 px-4 sm:px-7 py-3 bg-white/95 backdrop-blur-sm border-b border-tf-line">
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-tf-ink font-semibold text-xs transition-colors shadow-2xs"
            onClick={() => onNavigate?.('workspace')}
            aria-label={`Current workspace: ${workspace}`}
          >
            <span className="w-3.5 h-3.5 rounded-sm bg-brand-soft ring-2 ring-brand/40 shadow-xs" />
            <span className="hidden sm:inline font-bold">{workspace}</span>
            <Icon name="chevron" size={13} className="text-stone-400" />
          </button>

          {showSearch && (
            <label className="relative flex items-center gap-2 max-w-sm w-full ml-1 sm:ml-2 text-stone-400 focus-within:text-brand">
              <Icon name="search" size={15} className="absolute left-3 pointer-events-none" />
              <input
                type="search"
                placeholder="Search tasks, projects, or team..."
                aria-label="Search tasks and projects"
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-tf-line bg-stone-50/70 text-tf-ink text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand focus:bg-white transition-all"
              />
            </label>
          )}

          <div className="ml-auto flex items-center gap-2">
            <button
              className="relative w-9 h-9 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-stone-600 grid place-items-center transition-colors shadow-2xs"
              onClick={() => onNavigate?.('inbox')}
              aria-label={
                effectiveUnread ? `Notifications, ${effectiveUnread} unread` : 'Notifications'
              }
            >
              <Icon name="bell" size={17} />
              {effectiveUnread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>
            <Avatar name={user} />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 bg-tf-nav text-tf-nav-ink border-t border-stone-800/70 px-2 py-1 justify-around items-center backdrop-blur-md"
        aria-label="Mobile navigation"
      >
        {items.map((item) => {
          const isCurrent = active === item.path;
          const badge =
            item.path === 'inbox' ? (effectiveUnread > 0 ? effectiveUnread : null) : item.badge;

          return (
            <a
              key={item.path}
              href={`#${item.path}`}
              onClick={(event) => go(event, item.path)}
              aria-current={isCurrent ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-md text-[10px] font-medium transition-colors ${
                isCurrent ? 'text-lime font-bold' : 'text-tf-nav-ink hover:text-white'
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="mt-0.5">{item.label}</span>
              {badge && (
                <span className="absolute top-0.5 right-1 w-4 h-4 rounded-full bg-[#718c4d] text-white text-[9px] grid place-items-center font-bold">
                  {badge}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
