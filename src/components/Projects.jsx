import React, { useEffect, useMemo, useState } from 'react';
import AppShell, { Avatar } from './AppShell.jsx';
import {
  FolderKanbanIcon,
  ActivityIcon,
  CompassIcon,
  CheckSquareIcon,
  PlusIcon,
  SearchIcon,
} from './Icons.jsx';

export function CreateProjectForm({ onCancel, onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;

    onCreate({
      name: name.trim(),
      description: description.trim(),
      due: due || null,
      members: ['Nancy Rai'],
    });
  }

  return (
    <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
      <p className="p-3 rounded-lg bg-brand-soft/80 text-brand-dark text-xs leading-relaxed">
        Start a shared space for a goal, product, or team initiative.
      </p>

      <label className="flex flex-col gap-1.5 text-xs font-bold text-tf-ink">
        <span>
          Project name <span className="text-rose-600">*</span>
        </span>
        <input
          autoFocus
          required
          maxLength={120}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Website redesign"
          aria-label="Project name"
          className="w-full h-10 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand font-normal"
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
          placeholder="What is this project about?"
          aria-label="Project description"
          rows={3}
          className="w-full p-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-y font-normal"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-bold text-tf-ink">
        <span>
          Target date <small className="text-stone-400 font-normal ml-1">Optional</small>
        </span>
        <input
          type="date"
          min="2026-10-14"
          value={due || ''}
          onChange={(event) => setDue(event.target.value)}
          aria-label="Project target date"
          className="w-full h-10 px-3 rounded-lg border border-tf-line bg-white text-xs text-tf-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand font-normal"
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
          Create project
        </button>
      </div>
    </form>
  );
}

const initialProjects = [
  {
    id: 'PRJ-01',
    name: 'Web App',
    description: 'Design and build the TaskForge web experience.',
    open: 14,
    total: 32,
    updated: '2 hours ago',
    due: '2026-11-06',
    status: 'In progress',
    members: ['Nancy Rai', 'Arun Shah', 'Mina Lama'],
  },
  {
    id: 'PRJ-02',
    name: 'API Platform',
    description: 'Reliable APIs, integrations, and background services.',
    open: 9,
    total: 25,
    updated: 'Yesterday',
    due: '2026-11-14',
    status: 'In progress',
    members: ['Nancy Rai', 'Sita Karki', 'Arun Shah'],
  },
  {
    id: 'PRJ-03',
    name: 'Auth & Security',
    description: 'Identity, access control, and account security.',
    open: 5,
    total: 18,
    updated: '3 days ago',
    due: '2026-10-30',
    status: 'In progress',
    members: ['Arun Shah', 'Nancy Rai'],
  },
  {
    id: 'PRJ-04',
    name: 'Mobile App',
    description: 'Plan the companion mobile experience.',
    open: 0,
    total: 12,
    updated: 'Last week',
    due: '2026-12-02',
    status: 'Planning',
    members: ['Mina Lama', 'Sam Kim'],
  },
];

const colorList = ['#718a50', '#527b76', '#b2744f', '#8471a8', '#578393'];
const colorFor = (name) =>
  colorList[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % colorList.length];

const projectTabs = [
  { id: 'all', label: 'All projects' },
  { id: 'active', label: 'In progress' },
  { id: 'planning', label: 'Planning' },
  { id: 'archived', label: 'Archived' },
];

export default function Projects({ onNavigate, onOpenProject }) {
  const [projects, setProjects] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('taskforge-projects')) || initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('taskforge-projects', JSON.stringify(projects));
  }, [projects]);

  const counts = useMemo(
    () => ({
      active: projects.filter((project) => !project.archived && project.status === 'In progress')
        .length,
      planning: projects.filter((project) => !project.archived && project.status === 'Planning')
        .length,
      archived: projects.filter((project) => project.archived).length,
      tasks: projects.reduce((sum, project) => sum + project.total, 0),
    }),
    [projects]
  );

  const shownProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTab =
        tab === 'all'
          ? !project.archived
          : tab === 'active'
          ? !project.archived && project.status === 'In progress'
          : tab === 'planning'
          ? !project.archived && project.status === 'Planning'
          : project.archived;
      return (
        matchesTab &&
        `${project.name} ${project.description}`.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [projects, tab, query]);

  function addProject(project) {
    const number =
      projects.reduce(
        (max, item) => Math.max(max, Number(item.id.replace('PRJ-', '')) || 0),
        0
      ) + 1;
    setProjects((current) => [
      {
        id: `PRJ-${String(number).padStart(2, '0')}`,
        open: 0,
        total: 0,
        updated: 'Just now',
        status: 'Planning',
        archived: false,
        members: ['Nancy Rai'],
        ...project,
      },
      ...current,
    ]);
    setTab('all');
    setQuery('');
    setShowCreate(false);
  }

  function toggleArchive(id) {
    setProjects((current) =>
      current.map((project) =>
        project.id === id ? { ...project, archived: !project.archived } : project
      )
    );
  }

  const avatarColors = [
    'bg-brand-soft text-brand-dark',
    'bg-sky-100 text-sky-800',
    'bg-amber-100 text-amber-800',
    'bg-purple-100 text-purple-800',
  ];

  return (
    <AppShell active="projects" user="Nancy Rai" workspace="Product Team" onNavigate={onNavigate}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs text-tf-ink-3 font-semibold mb-1">
              Product Team <span className="text-stone-300">/</span> Projects
            </div>
            <p className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
              PLAN AND TRACK TEAM WORK
            </p>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-tf-ink mt-0.5">
              Projects
            </h1>
            <p className="mt-1 text-sm text-tf-ink-2">
              Keep your team’s work organized from kickoff to done.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-tf-ink text-white font-semibold text-xs hover:bg-stone-800 transition-colors shadow-sm self-start sm:self-auto"
            onClick={() => setShowCreate(true)}
          >
            <PlusIcon size={16} /> New project
          </button>
        </header>

        {/* Summary Metric Cards */}
        <section
          className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-tf-line rounded-xl shadow-xs divide-y lg:divide-y-0 lg:divide-x divide-tf-line overflow-hidden"
          aria-label="Project summary"
        >
          <article className="p-4 sm:p-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-brand-soft text-brand-dark grid place-items-center shrink-0">
              <FolderKanbanIcon size={20} />
            </span>
            <div>
              <b className="font-display font-extrabold text-2xl tracking-tight text-tf-ink block">
                {projects.filter((item) => !item.archived).length}
              </b>
              <small className="text-xs text-tf-ink-2 font-medium">Projects</small>
            </div>
          </article>

          <article className="p-4 sm:p-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 grid place-items-center shrink-0">
              <ActivityIcon size={20} />
            </span>
            <div>
              <b className="font-display font-extrabold text-2xl tracking-tight text-amber-600 block">
                {counts.active}
              </b>
              <small className="text-xs text-amber-800 font-medium">In progress</small>
            </div>
          </article>

          <article className="p-4 sm:p-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 grid place-items-center shrink-0">
              <CompassIcon size={20} />
            </span>
            <div>
              <b className="font-display font-extrabold text-2xl tracking-tight text-purple-700 block">
                {counts.planning}
              </b>
              <small className="text-xs text-purple-800 font-medium">Planning</small>
            </div>
          </article>

          <article className="p-4 sm:p-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 grid place-items-center shrink-0">
              <CheckSquareIcon size={20} />
            </span>
            <div>
              <b className="font-display font-extrabold text-2xl tracking-tight text-sky-800 block">
                {counts.tasks}
              </b>
              <small className="text-xs text-sky-800 font-medium">Total tasks</small>
            </div>
          </article>
        </section>

        {/* Projects List Panel */}
        <section
          className="bg-white border border-tf-line rounded-xl shadow-xs overflow-hidden"
          aria-labelledby="project-list-title"
        >
          {/* Panel Head */}
          <div className="px-5 py-4 border-b border-tf-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
                YOUR WORKSPACE
              </p>
              <h2 id="project-list-title" className="text-base font-display font-bold text-tf-ink">
                All projects
              </h2>
            </div>
            <label className="relative flex items-center gap-2 max-w-xs w-full text-stone-400">
              <SearchIcon size={15} className="absolute left-3 pointer-events-none" />
              <input
                aria-label="Search projects"
                placeholder="Search projects..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-tf-line bg-stone-50/70 text-tf-ink text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </label>
          </div>

          {/* Project Status Tabs */}
          <nav
            className="flex items-center gap-4 sm:gap-6 px-5 border-b border-tf-line overflow-x-auto text-xs"
            aria-label="Filter projects"
          >
            {projectTabs.map((item) => {
              const isCurrent = tab === item.id;
              const count =
                item.id === 'all'
                  ? projects.filter((project) => !project.archived).length
                  : counts[item.id];

              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`relative py-3.5 flex items-center gap-2 font-bold whitespace-nowrap transition-colors ${
                    isCurrent
                      ? 'text-tf-ink border-b-2 border-brand-dark'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {item.label}
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

          {/* Project Grid */}
          {shownProjects.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              {shownProjects.map((project, index) => {
                const complete = project.total
                  ? Math.round(((project.total - project.open) / project.total) * 100)
                  : 0;

                return (
                  <article
                    key={project.id}
                    className="p-5 rounded-xl border border-tf-line bg-white hover:border-brand/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <header className="flex items-center gap-3">
                        <button
                          className={`w-10 h-10 rounded-xl grid place-items-center font-display font-extrabold text-sm shrink-0 transition-transform hover:scale-105 ${
                            avatarColors[index % avatarColors.length]
                          }`}
                          onClick={() => onOpenProject(project.name)}
                          aria-label={`Open ${project.name}`}
                        >
                          {project.name.slice(0, 1)}
                        </button>
                        <button
                          className="text-left font-display font-bold text-base text-tf-ink hover:text-brand-dark truncate transition-colors"
                          onClick={() => onOpenProject(project.name)}
                        >
                          {project.name}
                        </button>
                        <button
                          className="ml-auto w-8 h-8 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 grid place-items-center text-sm font-bold transition-colors"
                          aria-label={
                            project.archived
                              ? `Restore ${project.name}`
                              : `Archive ${project.name}`
                          }
                          onClick={() => toggleArchive(project.id)}
                          title={project.archived ? 'Restore' : 'Archive'}
                        >
                          {project.archived ? '↶' : '···'}
                        </button>
                      </header>

                      <p className="mt-3 text-xs text-tf-ink-2 line-clamp-2 leading-relaxed">
                        {project.description || 'No description added yet.'}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            project.archived
                              ? 'bg-stone-100 text-stone-600'
                              : project.status === 'Planning'
                              ? 'bg-purple-50 text-purple-700'
                              : 'bg-brand-soft text-brand-dark'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              project.archived
                                ? 'bg-stone-400'
                                : project.status === 'Planning'
                                ? 'bg-purple-500'
                                : 'bg-brand'
                            }`}
                          />
                          {project.archived ? 'Archived' : project.status}
                        </span>
                        <span className="text-stone-400 font-medium">
                          {project.open} open <span className="text-stone-300">·</span>{' '}
                          {project.total} tasks
                        </span>
                      </div>

                      <div
                        className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden"
                        role="progressbar"
                        aria-valuenow={complete}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`${project.name}: ${complete}% complete`}
                      >
                        <div
                          className="h-full rounded-full bg-brand transition-all duration-300"
                          style={{ width: `${complete}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-tf-line/60 text-xs">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {project.members.map((member) => (
                            <Avatar
                              key={member}
                              name={member}
                              color={colorFor(member)}
                              size="small"
                            />
                          ))}
                        </div>
                        <button
                          className="font-bold text-xs text-brand-dark hover:underline flex items-center gap-1"
                          onClick={() => onOpenProject(project.name)}
                        >
                          Open project <span>→</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="p-10 text-center text-stone-500 flex flex-col items-center">
              <span className="w-10 h-10 rounded-xl bg-brand-soft text-brand-dark grid place-items-center mb-2">
                <FolderKanbanIcon size={20} />
              </span>
              <h3 className="text-sm font-bold text-tf-ink">
                {tab === 'archived' ? 'No archived projects' : 'No projects match your search'}
              </h3>
              <p className="text-xs text-stone-400 mt-1 mb-3">
                {tab === 'archived'
                  ? 'Projects you archive will appear here.'
                  : 'Try a different search or create a project.'}
              </p>
              {tab !== 'archived' && (
                <button
                  className="text-xs font-bold text-brand-dark hover:underline"
                  onClick={() => {
                    setQuery('');
                    setShowCreate(true);
                  }}
                >
                  Create a project
                </button>
              )}
            </div>
          )}

          {/* Panel Footer */}
          <footer className="px-5 py-3 border-t border-tf-line flex items-center justify-between text-xs text-stone-500 bg-stone-50/30">
            <span>
              Showing {shownProjects.length} of {projects.length} projects
            </span>
            <span className="text-stone-400">Project details saved locally</span>
          </footer>
        </section>
      </div>

      {/* Create Project Modal */}
      {showCreate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs"
          onMouseDown={(event) => event.target === event.currentTarget && setShowCreate(false)}
        >
          <section
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-white border border-tf-line shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-project-title"
          >
            <header className="flex items-center justify-between pb-4 border-b border-tf-line">
              <div>
                <p className="block text-[10px] font-bold tracking-wider text-brand-dark uppercase">
                  PRODUCT TEAM
                </p>
                <h2 id="new-project-title" className="text-lg font-display font-bold text-tf-ink">
                  Create a project
                </h2>
              </div>
              <button
                className="w-8 h-8 rounded-lg border border-tf-line hover:bg-stone-50 text-stone-500 hover:text-stone-900 grid place-items-center text-lg transition-colors"
                aria-label="Close form"
                onClick={() => setShowCreate(false)}
              >
                ×
              </button>
            </header>
            <CreateProjectForm onCancel={() => setShowCreate(false)} onCreate={addProject} />
          </section>
        </div>
      )}
    </AppShell>
  );
}
