import { useEffect, useState } from 'react';
import {
  LogoMark,
  LayoutDashboardIcon,
  FolderKanbanIcon,
  ListTodoIcon,
  BellIcon,
  UsersIcon,
  SettingsIcon,
  PlusIcon,
} from './Icons.jsx';

const projectNames = ['Website redesign', 'Mobile app', 'Brand refresh', 'Q4 planning'];

function getStoredUnread() {
  try {
    const raw = window.localStorage.getItem('taskforge-inbox-notifications');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter((n) => !n.read).length;
    }
  } catch {}
  return 4;
}

export default function Sidebar({ activePage, onNavigate }) {
  const [unread, setUnread] = useState(getStoredUnread);

  useEffect(() => {
    const handleUpdate = () => setUnread(getStoredUnread());
    window.addEventListener('taskforge-inbox-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('taskforge-inbox-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const dotColors = ['bg-teal-400', 'bg-amber-400', 'bg-indigo-400', 'bg-purple-400'];

  const navIconMap = {
    Overview: LayoutDashboardIcon,
    Projects: FolderKanbanIcon,
    'My tasks': ListTodoIcon,
    Inbox: BellIcon,
  };

  return (
    <aside className="h-screen sticky top-0 bg-white border-r border-tf-line p-5 flex flex-col gap-5 z-20">
      {/* Brand */}
      <a
        className="flex items-center gap-2.5 text-tf-ink font-display font-extrabold text-lg tracking-tight no-underline group"
        href="#top"
        aria-label="TaskForge home"
      >
        <LogoMark size={28} className="shrink-0 group-hover:scale-105 transition-transform" />
        <span>
          Task<span className="text-brand">Forge</span>
        </span>
      </a>

      {/* Workspace Switcher */}
      <button className="w-full flex items-center text-left gap-2.5 p-2 rounded-xl border border-tf-line bg-white hover:bg-stone-50 transition-colors shadow-2xs">
        <span className="w-8 h-8 rounded-lg bg-brand-soft text-brand-dark grid place-items-center font-bold text-xs shrink-0">
          N
        </span>
        <span className="min-w-0 flex-1">
          <b className="block text-xs text-tf-ink truncate">Northstar Studio</b>
          <small className="block text-[10px] text-stone-400">Free workspace</small>
        </span>
        <span className="text-stone-400 text-xs">⌄</span>
      </button>

      {/* Workspace Navigation */}
      <div>
        <p className="px-2 mb-2 text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Workspace
        </p>
        <nav className="flex flex-col gap-0.5" aria-label="Workspace navigation">
          {['Overview', 'Projects', 'My tasks', 'Inbox'].map((name) => {
            const isCurrent = activePage === name;
            const NavIcon = navIconMap[name] || LayoutDashboardIcon;

            return (
              <button
                key={name}
                className={`h-9 px-3 flex items-center gap-2.5 rounded-lg text-left text-xs transition-colors ${
                  isCurrent
                    ? 'bg-brand-soft text-brand-dark font-bold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
                onClick={() => onNavigate(name)}
              >
                <NavIcon size={16} className="shrink-0 opacity-80" />
                <span className="truncate">{name}</span>
                {name === 'Projects' && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-full bg-stone-100 text-[10px] text-stone-500 font-semibold">
                    8
                  </span>
                )}
                {name === 'My tasks' && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-full bg-stone-100 text-[10px] text-stone-500 font-semibold">
                    6
                  </span>
                )}
                {name === 'Inbox' && unread > 0 && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center justify-between px-2 mb-2">
          <p className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Your projects
          </p>
          <button
            aria-label="Add project"
            onClick={() => onNavigate('New project')}
            className="text-stone-400 hover:text-stone-700 text-xs p-1"
          >
            <PlusIcon size={14} />
          </button>
        </div>
        <nav className="flex flex-col gap-0.5" aria-label="Projects">
          {projectNames.map((name, i) => {
            const isCurrent = name === 'Website redesign';
            return (
              <button
                key={name}
                className={`h-8 px-3 flex items-center gap-2.5 rounded-lg text-left text-xs transition-colors ${
                  isCurrent
                    ? 'bg-brand-soft text-brand-dark font-bold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
                onClick={() => onNavigate(name)}
              >
                <i className={`w-2 h-2 rounded-xs shrink-0 ${dotColors[i % dotColors.length]}`} />
                <span className="truncate">{name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Manage */}
      <div>
        <p className="px-2 mb-2 text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Manage
        </p>
        <nav className="flex flex-col gap-0.5">
          <button
            className="h-9 px-3 flex items-center gap-2.5 rounded-lg text-left text-xs text-stone-600 hover:bg-stone-50 transition-colors"
            onClick={() => onNavigate('Members')}
          >
            <UsersIcon size={16} className="shrink-0 opacity-80" />
            <span>Members</span>
          </button>
          <button
            className="h-9 px-3 flex items-center gap-2.5 rounded-lg text-left text-xs text-stone-600 hover:bg-stone-50 transition-colors"
            onClick={() => onNavigate('Settings')}
          >
            <SettingsIcon size={16} className="shrink-0 opacity-80" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Profile */}
      <div className="mt-auto pt-3 border-t border-tf-line flex items-center gap-2.5">
        <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold grid place-items-center shrink-0">
          AM
        </span>
        <span className="min-w-0 flex-1">
          <b className="block text-xs text-tf-ink truncate">Alex Morgan</b>
          <small className="block text-[10px] text-stone-400">Project manager</small>
        </span>
        <button
          aria-label="Account options"
          className="text-stone-400 hover:text-stone-700 font-bold text-sm px-1"
        >
          ···
        </button>
      </div>
    </aside>
  );
}
