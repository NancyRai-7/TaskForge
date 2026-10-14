import React, { useEffect, useMemo, useState } from 'react';
import AppShell, { Avatar } from './AppShell.jsx';
import {
  UsersIcon,
  CrownIcon,
  ShieldIcon,
  UserIcon,
  SearchIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from './Icons.jsx';

const initialMembers = [
  { id: 'usr-1', name: 'Nancy Rai', email: 'nancy@taskforge.dev', role: 'Owner', color: '#718a50', joined: 'Oct 2026' },
  { id: 'usr-2', name: 'Arun Shah', email: 'arun@taskforge.dev', role: 'Manager', color: '#527b76', joined: 'Oct 2026' },
  { id: 'usr-3', name: 'Alex Morgan', email: 'alex@taskforge.dev', role: 'Manager', color: '#477953', joined: 'Oct 2026' },
  { id: 'usr-4', name: 'Mina Lama', email: 'mina@taskforge.dev', role: 'Member', color: '#b2744f', joined: 'Oct 2026' },
  { id: 'usr-5', name: 'Sita Karki', email: 'sita@taskforge.dev', role: 'Member', color: '#8471a8', joined: 'Oct 2026' },
  { id: 'usr-6', name: 'Sam Kim', email: 'sam@taskforge.dev', role: 'Member', color: '#578393', joined: 'Oct 2026' },
];

const STORAGE_KEY = 'taskforge-team-members';

export default function Members({ onNavigate }) {
  const [members, setMembers] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return initialMembers;
  });

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }, [members]);

  const stats = useMemo(() => {
    const total = members.length;
    const owners = members.filter((m) => m.role === 'Owner').length;
    const managers = members.filter((m) => m.role === 'Manager').length;
    const regular = members.filter((m) => m.role === 'Member').length;
    return { total, owners, managers, regular };
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'All' || m.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [members, search, roleFilter]);

  function handleInvite(e) {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    const colors = ['#718a50', '#527b76', '#b2744f', '#8471a8', '#578393', '#477953'];
    const newMember = {
      id: `usr-${Date.now()}`,
      name: inviteName.trim(),
      email: inviteEmail.trim().toLowerCase(),
      role: inviteRole,
      color: colors[members.length % colors.length],
      joined: 'Just now',
    };

    setMembers((prev) => [newMember, ...prev]);
    setInviteName('');
    setInviteEmail('');
    setInviteRole('Member');
    setShowInviteModal(false);
  }

  function handleRemove(id) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function handleRoleChange(id, newRole) {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
  }

  return (
    <AppShell active="members" user="Nancy Rai" workspace="Product Team" onNavigate={onNavigate}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs text-tf-ink-3 font-semibold mb-1">
              Product Team <span className="text-stone-300">/</span> Members
            </div>
            <p className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
              TEAM &amp; PERMISSIONS
            </p>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-tf-ink mt-0.5">
              Workspace Members
            </h1>
            <p className="mt-1 text-sm text-tf-ink-2">
              Manage who has access to this workspace and their team roles.
            </p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-tf-ink text-white font-semibold text-xs hover:bg-stone-800 transition-colors shadow-sm self-start sm:self-auto"
          >
            <PlusIcon size={16} /> Invite member
          </button>
        </header>

        {/* Quick Stat Cards */}
        <section
          className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-tf-line rounded-xl shadow-xs divide-y lg:divide-y-0 lg:divide-x divide-tf-line overflow-hidden"
          aria-label="Member stats"
        >
          <article className="p-4 sm:p-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-brand-soft text-brand-dark grid place-items-center shrink-0">
              <UsersIcon size={20} />
            </span>
            <div>
              <b className="font-display font-extrabold text-2xl tracking-tight text-tf-ink block">
                {stats.total}
              </b>
              <small className="text-xs text-tf-ink-2 font-medium">Total members</small>
            </div>
          </article>

          <article className="p-4 sm:p-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center shrink-0">
              <CrownIcon size={20} />
            </span>
            <div>
              <b className="font-display font-extrabold text-2xl tracking-tight text-tf-ink block">
                {stats.owners}
              </b>
              <small className="text-xs text-tf-ink-2 font-medium">Workspace owner</small>
            </div>
          </article>

          <article className="p-4 sm:p-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 grid place-items-center shrink-0">
              <ShieldIcon size={20} />
            </span>
            <div>
              <b className="font-display font-extrabold text-2xl tracking-tight text-tf-ink block">
                {stats.managers}
              </b>
              <small className="text-xs text-tf-ink-2 font-medium">Managers</small>
            </div>
          </article>

          <article className="p-4 sm:p-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 grid place-items-center shrink-0">
              <UserIcon size={20} />
            </span>
            <div>
              <b className="font-display font-extrabold text-2xl tracking-tight text-tf-ink block">
                {stats.regular}
              </b>
              <small className="text-xs text-tf-ink-2 font-medium">Contributors</small>
            </div>
          </article>
        </section>

        {/* Member Directory Panel */}
        <section
          className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden"
          aria-labelledby="member-directory-title"
        >
          {/* Search & Filter Bar */}
          <div className="px-5 py-4 border-b border-tf-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="relative flex items-center gap-2 max-w-sm w-full text-stone-400">
              <SearchIcon size={15} className="absolute left-3 pointer-events-none" />
              <input
                aria-label="Search members"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-tf-line bg-stone-50/70 text-tf-ink text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </label>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-semibold">Role:</span>
              <div className="inline-flex gap-1 p-1 rounded-lg bg-stone-100">
                {['All', 'Owner', 'Manager', 'Member'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      roleFilter === role
                        ? 'bg-white text-tf-ink shadow-2xs font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Member List */}
          {filteredMembers.length > 0 ? (
            <div className="divide-y divide-tf-line/60">
              {filteredMembers.map((member) => {
                const isOwner = member.role === 'Owner';
                return (
                  <div
                    key={member.id}
                    className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/70 transition-colors"
                  >
                    {/* User info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar name={member.name} color={member.color} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <b className="font-bold text-sm text-tf-ink truncate">{member.name}</b>
                          {isOwner && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              <CrownIcon size={11} /> Owner
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-stone-400 truncate block">{member.email}</span>
                      </div>
                    </div>

                    {/* Actions and role selector */}
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      <span className="text-xs text-stone-400 hidden md:inline">Joined {member.joined}</span>

                      {isOwner ? (
                        <span className="px-3 py-1 rounded-lg border border-tf-line bg-stone-50 text-xs font-semibold text-stone-600">
                          Workspace Owner
                        </span>
                      ) : (
                        <select
                          value={member.role}
                          onChange={(e) => handleRoleChange(member.id, e.target.value)}
                          aria-label={`Change role for ${member.name}`}
                          className="h-8 px-2.5 rounded-lg border border-tf-line bg-white text-xs font-semibold text-tf-ink focus:outline-none focus:border-brand"
                        >
                          <option value="Manager">Manager</option>
                          <option value="Member">Member</option>
                        </select>
                      )}

                      {!isOwner && (
                        <button
                          onClick={() => handleRemove(member.id)}
                          className="w-8 h-8 rounded-lg hover:bg-rose-50 text-stone-400 hover:text-rose-600 grid place-items-center transition-colors"
                          title={`Remove ${member.name}`}
                          aria-label={`Remove ${member.name}`}
                        >
                          <TrashIcon size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 text-center text-stone-500 flex flex-col items-center">
              <span className="w-10 h-10 rounded-xl bg-stone-100 text-stone-400 grid place-items-center mb-2">
                <SearchIcon size={20} />
              </span>
              <h3 className="text-sm font-bold text-tf-ink">No members found</h3>
              <p className="text-xs text-stone-400 mt-1 mb-3">
                No team member matches your search or role filter.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setRoleFilter('All');
                }}
                className="text-xs font-bold text-brand-dark hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Footer */}
          <footer className="px-5 py-3 border-t border-tf-line flex items-center justify-between text-xs text-stone-500 bg-stone-50/30">
            <span>
              Showing {filteredMembers.length} of {members.length} members
            </span>
            <span className="text-stone-400">Roles take effect immediately</span>
          </footer>
        </section>
      </div>

      {/* Simple Invite Modal */}
      {showInviteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs"
          onMouseDown={(e) => e.target === e.currentTarget && setShowInviteModal(false)}
        >
          <div
            className="w-full max-w-md p-6 rounded-2xl bg-white border border-tf-line shadow-2xl animate-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-title"
          >
            <div className="flex items-center justify-between pb-3 border-b border-tf-line">
              <h2 id="invite-title" className="text-base font-display font-bold text-tf-ink">
                Invite a team member
              </h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="w-7 h-7 rounded-lg border border-tf-line hover:bg-stone-50 text-stone-500 grid place-items-center text-sm"
                aria-label="Close modal"
              >
                <XIcon size={14} />
              </button>
            </div>

            <form onSubmit={handleInvite} className="flex flex-col gap-3.5 mt-4">
              <label className="flex flex-col gap-1 text-xs font-bold text-tf-ink">
                <span>Full name <span className="text-rose-500">*</span></span>
                <input
                  required
                  autoFocus
                  placeholder="e.g. Jordan Lee"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-tf-line text-xs font-normal text-tf-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-bold text-tf-ink">
                <span>Email address <span className="text-rose-500">*</span></span>
                <input
                  type="email"
                  required
                  placeholder="e.g. jordan@taskforge.dev"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-tf-line text-xs font-normal text-tf-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                />
              </label>

              <label className="flex flex-col gap-1 text-xs font-bold text-tf-ink">
                <span>Role</span>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-tf-line text-xs font-semibold text-tf-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                >
                  <option value="Member">Member (can edit tasks &amp; projects)</option>
                  <option value="Manager">Manager (can manage members &amp; settings)</option>
                </select>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="h-9 px-4 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-xs font-bold text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-9 px-4 rounded-lg bg-tf-ink hover:bg-stone-800 text-white text-xs font-bold shadow-xs"
                >
                  Send invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
