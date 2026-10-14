import React, { useEffect, useState } from 'react';
import AppShell from './AppShell.jsx';
import {
  SettingsIcon,
  BellIcon,
  SlidersIcon,
  GlobeIcon,
  LaptopIcon,
  DownloadIcon,
  CheckIcon,
  TrashIcon,
} from './Icons.jsx';

const DEFAULT_SETTINGS = {
  workspaceName: 'Product Team',
  slug: 'product-team',
  accentColor: '#718a50',
  timezone: 'Asia/Kathmandu (UTC+05:45)',
  weekStartsOn: 'Monday',
  emailDigest: 'daily',
  notifyAssignments: true,
  notifyMentions: true,
  notifyDueDates: true,
  notifyStatusChanges: false,
  defaultScreen: 'dashboard',
  compactMode: false,
  keyboardShortcuts: true,
};

const STORAGE_KEY = 'taskforge-workspace-settings';

export default function Settings({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('general');
  const [savedNotice, setSavedNotice] = useState(false);

  const [settings, setSettings] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {}
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  function handleSave(e) {
    if (e) e.preventDefault();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  }

  function handleExportData() {
    try {
      const exportBlob = new Blob(
        [
          JSON.stringify(
            {
              workspace: settings.workspaceName,
              exportedAt: new Date().toISOString(),
              settings,
            },
            null,
            2
          ),
        ],
        { type: 'application/json' }
      );
      const url = URL.createObjectURL(exportBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${settings.slug}-workspace-backup.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      window.alert('Failed to export workspace backup.');
    }
  }

  const accentOptions = [
    { name: 'Forest', color: '#718a50' },
    { name: 'Teal', color: '#527b76' },
    { name: 'Indigo', color: '#578393' },
    { name: 'Purple', color: '#8471a8' },
    { name: 'Amber', color: '#b2744f' },
  ];

  return (
    <AppShell active="settings" user="Nancy Rai" workspace={settings.workspaceName} onNavigate={onNavigate}>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs text-tf-ink-3 font-semibold mb-1">
              {settings.workspaceName} <span className="text-stone-300">/</span> Settings
            </div>
            <p className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
              WORKSPACE PREFERENCES
            </p>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-tf-ink mt-0.5">
              Workspace Settings
            </h1>
            <p className="mt-1 text-sm text-tf-ink-2">
              Customize workspace identity, notification alerts, and team workflows.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {savedNotice && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold animate-in fade-in duration-200">
                <CheckIcon size={14} /> Saved
              </span>
            )}
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-tf-ink text-white font-semibold text-xs hover:bg-stone-800 transition-colors shadow-sm"
            >
              Save changes
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav
          className="flex items-center gap-2 border-b border-tf-line text-xs font-semibold"
          aria-label="Settings sections"
        >
          {[
            { id: 'general', label: 'General', icon: SettingsIcon },
            { id: 'notifications', label: 'Notifications', icon: BellIcon },
            { id: 'preferences', label: 'Preferences', icon: SlidersIcon },
            { id: 'danger', label: 'Data & Reset', icon: TrashIcon },
          ].map((tab) => {
            const isCurrent = activeTab === tab.id;
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`py-3 px-3 sm:px-4 flex items-center gap-2 border-b-2 font-bold transition-colors ${
                  isCurrent
                    ? 'border-brand-dark text-tf-ink'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <IconComp size={15} className="shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Content Panels */}
        {activeTab === 'general' && (
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            {/* Workspace Profile Card */}
            <section className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-tf-line">
                <h2 className="text-base font-display font-bold text-tf-ink">Workspace Profile</h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Update your workspace name and public URL.
                </p>
              </div>

              <div className="p-5 flex flex-col gap-5 text-xs font-semibold text-tf-ink">
                {/* Workspace Name */}
                <label className="flex flex-col gap-1.5 max-w-md">
                  <span>Workspace name</span>
                  <input
                    value={settings.workspaceName}
                    onChange={(e) => setSettings({ ...settings, workspaceName: e.target.value })}
                    className="h-9 px-3 rounded-lg border border-tf-line text-xs text-tf-ink font-normal focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  />
                </label>

                {/* Slug */}
                <label className="flex flex-col gap-1.5 max-w-md">
                  <span>Workspace URL</span>
                  <div className="flex items-center rounded-lg border border-tf-line overflow-hidden focus-within:ring-2 focus-within:ring-brand/30 focus-within:border-brand">
                    <span className="px-3 bg-stone-50 text-stone-400 border-r border-tf-line text-xs font-normal select-none">
                      taskforge.dev/
                    </span>
                    <input
                      value={settings.slug}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                        })
                      }
                      className="h-9 px-3 w-full text-xs text-tf-ink font-normal focus:outline-none"
                    />
                  </div>
                </label>

                {/* Accent Color */}
                <div>
                  <span className="block mb-2">Workspace accent color</span>
                  <div className="flex items-center gap-3">
                    {accentOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.name}
                        onClick={() => setSettings({ ...settings, accentColor: opt.color })}
                        style={{ backgroundColor: opt.color }}
                        className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center text-white text-xs ${
                          settings.accentColor === opt.color
                            ? 'ring-2 ring-offset-2 ring-stone-900 scale-110 shadow-sm'
                            : 'hover:scale-105 opacity-90'
                        }`}
                        title={opt.name}
                      >
                        {settings.accentColor === opt.color && <CheckIcon size={12} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Regional & Timezone Card */}
            <section className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-tf-line">
                <h2 className="text-base font-display font-bold text-tf-ink">Time &amp; Localization</h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Set how dates, sprints, and timestamps are formatted.
                </p>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-semibold text-tf-ink">
                <label className="flex flex-col gap-1.5">
                  <span>Primary Timezone</span>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="h-9 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink font-normal focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  >
                    <option value="Asia/Kathmandu (UTC+05:45)">Asia/Kathmandu (UTC+05:45)</option>
                    <option value="America/New_York (UTC-04:00)">America/New_York (UTC-04:00)</option>
                    <option value="America/Los_Angeles (UTC-07:00)">America/Los_Angeles (UTC-07:00)</option>
                    <option value="Europe/London (UTC+01:00)">Europe/London (UTC+01:00)</option>
                    <option value="Asia/Tokyo (UTC+09:00)">Asia/Tokyo (UTC+09:00)</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span>Week starts on</span>
                  <select
                    value={settings.weekStartsOn}
                    onChange={(e) => setSettings({ ...settings, weekStartsOn: e.target.value })}
                    className="h-9 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink font-normal focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  >
                    <option value="Monday">Monday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </label>
              </div>
            </section>
          </form>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <section className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-tf-line">
                <h2 className="text-base font-display font-bold text-tf-ink">Notification Alerts</h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Control which activity triggers inbox and badge updates.
                </p>
              </div>

              <div className="divide-y divide-tf-line/60">
                {[
                  {
                    key: 'notifyAssignments',
                    title: 'Task assignments',
                    desc: 'Notify when team members assign you to new or existing tasks.',
                  },
                  {
                    key: 'notifyMentions',
                    title: 'Comments & mentions',
                    desc: 'Notify when someone comments on your task or @mentions your name.',
                  },
                  {
                    key: 'notifyDueDates',
                    title: 'Deadline reminders',
                    desc: 'Notify when high-priority tasks are due within 24 hours.',
                  },
                  {
                    key: 'notifyStatusChanges',
                    title: 'Status movements',
                    desc: 'Notify when tasks you watch are moved across columns.',
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
                  >
                    <div>
                      <b className="block text-xs font-bold text-tf-ink">{item.title}</b>
                      <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={settings[item.key]}
                      onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key] })}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                        settings[item.key] ? 'bg-brand' : 'bg-stone-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                          settings[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-tf-line">
                <h2 className="text-base font-display font-bold text-tf-ink">Email Digests</h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Choose how often you receive summary email roundups.
                </p>
              </div>

              <div className="p-5 flex flex-col gap-3 text-xs text-tf-ink">
                {[
                  { id: 'daily', label: 'Daily digest (every morning at 9:00 AM)' },
                  { id: 'weekly', label: 'Weekly summary (every Monday)' },
                  { id: 'never', label: 'Never send digest emails' },
                ].map((d) => (
                  <label key={d.id} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="emailDigest"
                      value={d.id}
                      checked={settings.emailDigest === d.id}
                      onChange={(e) => setSettings({ ...settings, emailDigest: e.target.value })}
                      className="accent-brand"
                    />
                    <span>{d.label}</span>
                  </label>
                ))}
              </div>
            </section>
          </form>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <section className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-tf-line">
                <h2 className="text-base font-display font-bold text-tf-ink">Display &amp; Workflow</h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Configure how TaskForge behaves when you open the app.
                </p>
              </div>

              <div className="p-5 flex flex-col gap-5 text-xs text-tf-ink font-semibold">
                <label className="flex flex-col gap-1.5 max-w-md">
                  <span>Default launch view</span>
                  <select
                    value={settings.defaultScreen}
                    onChange={(e) => setSettings({ ...settings, defaultScreen: e.target.value })}
                    className="h-9 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink font-normal focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  >
                    <option value="dashboard">Dashboard Overview</option>
                    <option value="tasks">My Tasks</option>
                    <option value="projects">Projects List</option>
                  </select>
                </label>

                <div className="flex items-center justify-between max-w-xl py-3 border-t border-tf-line/60">
                  <div>
                    <b className="block text-xs font-bold text-tf-ink">Compact task density</b>
                    <span className="text-xs text-stone-500 font-normal">
                      Reduce padding on task lists and board columns for higher information density.
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.compactMode}
                    onClick={() => setSettings({ ...settings, compactMode: !settings.compactMode })}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                      settings.compactMode ? 'bg-brand' : 'bg-stone-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        settings.compactMode ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between max-w-xl py-3 border-t border-tf-line/60">
                  <div>
                    <b className="block text-xs font-bold text-tf-ink">Global keyboard shortcuts</b>
                    <span className="text-xs text-stone-500 font-normal">
                      Enable shortcuts such as ⌘K (search), C (new task), and Esc (close drawers).
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.keyboardShortcuts}
                    onClick={() =>
                      setSettings({ ...settings, keyboardShortcuts: !settings.keyboardShortcuts })
                    }
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                      settings.keyboardShortcuts ? 'bg-brand' : 'bg-stone-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        settings.keyboardShortcuts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>
          </form>
        )}

        {/* Data & Reset Tab */}
        {activeTab === 'danger' && (
          <div className="flex flex-col gap-6">
            <section className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-tf-line">
                <h2 className="text-base font-display font-bold text-tf-ink">Export Workspace Data</h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Download a JSON archive containing tasks, projects, and workspace preferences.
                </p>
              </div>

              <div className="p-5 flex items-center justify-between">
                <div>
                  <b className="block text-xs font-bold text-tf-ink">JSON Data Backup</b>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Save a full offline copy of all local workspace records.
                  </p>
                </div>
                <button
                  onClick={handleExportData}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors shadow-2xs"
                >
                  <DownloadIcon size={15} /> Export JSON
                </button>
              </div>
            </section>

            <section className="bg-white border border-rose-200 rounded-xl shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-rose-100 bg-rose-50/30">
                <h2 className="text-base font-display font-bold text-rose-800">Danger Zone</h2>
                <p className="text-xs text-rose-600 mt-0.5">
                  Destructive actions for this prototype session.
                </p>
              </div>

              <div className="p-5 flex items-center justify-between">
                <div>
                  <b className="block text-xs font-bold text-tf-ink">Reset prototype data</b>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Clear local storage and restore default mock tasks and projects.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all demo tasks and restore default settings?')) {
                      window.localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-2xs"
                >
                  Reset data
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </AppShell>
  );
}
