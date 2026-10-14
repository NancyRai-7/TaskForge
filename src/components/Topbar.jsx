import React from 'react';
import { SearchIcon, BellIcon } from './Icons.jsx';

export default function Topbar({ onNavigate }) {
  return (
    <header className="h-16 px-4 sm:px-8 bg-white border-b border-tf-line flex items-center gap-3">
      <button
        className="md:hidden p-2 text-stone-600 hover:text-stone-900"
        aria-label="Open navigation"
        onClick={() => onNavigate('Menu')}
      >
        ☰
      </button>

      <div className="text-xs text-stone-500">
        Projects <span className="text-stone-300 mx-1">/</span>{' '}
        <b className="text-tf-ink font-semibold">Website redesign</b>
      </div>

      <div className="flex-1" />

      <label className="relative hidden sm:flex items-center gap-2 max-w-xs w-full text-stone-400">
        <SearchIcon size={15} className="absolute left-3 pointer-events-none" />
        <input
          aria-label="Search"
          placeholder="Search anything..."
          className="w-full h-9 pl-9 pr-12 rounded-lg border border-tf-line bg-stone-50/70 text-xs text-tf-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
        />
        <kbd className="absolute right-2.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-200/60 text-stone-600">
          ⌘ K
        </kbd>
      </label>

      <button
        className="w-8 h-8 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-stone-500 text-xs font-semibold grid place-items-center transition-colors shadow-2xs"
        aria-label="Help"
      >
        ?
      </button>

      <button
        className="relative w-8 h-8 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-stone-600 grid place-items-center transition-colors shadow-2xs"
        aria-label="Notifications"
        onClick={() => onNavigate('inbox')}
      >
        <BellIcon size={16} />
        <i className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
      </button>

      <span
        className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold grid place-items-center shrink-0 shadow-2xs ring-1 ring-black/5"
        title="Alex Morgan"
      >
        AM
      </span>
    </header>
  );
}
