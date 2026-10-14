import React, { useEffect, useRef, useState } from 'react';
import {
  Sidebar,
  Topbar,
  SummaryCards,
  TaskBoard,
  TaskDrawer,
  CreateTaskForm,
  LandingPage,
  WorkspaceHome,
  Dashboard,
  MyTasks,
  Projects,
  Inbox,
  Members,
  Settings,
} from './components/index.js';
import { initialTasks } from './data/tasks.js';

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [extraDashboardTasks, setExtraDashboardTasks] = useState([]);
  const [page, setPage] = useState('landing');
  const currentPage = useRef(page);
  const [selectedProject, setSelectedProject] = useState('MVP delivery board');
  const [selectedTask, setSelectedTask] = useState(null);
  const [createStatus, setCreateStatus] = useState(null);

  useEffect(() => {
    currentPage.current = page;
  }, [page]);

  // Handle browser back/forward navigation
  useEffect(() => {
    window.history.replaceState({ taskForge: true, page: currentPage.current }, '', window.location.href);

    const handlePopState = (event) => {
      if (event.state?.taskForge) {
        currentPage.current = event.state.page;
        setPage(event.state.page);
      } else {
        window.history.pushState({ taskForge: true, page: currentPage.current }, '', window.location.href);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function navigatePage(nextPage) {
    if (nextPage === currentPage.current) return;
    currentPage.current = nextPage;
    window.history.pushState({ taskForge: true, page: nextPage }, '', window.location.href);
    setPage(nextPage);
  }

  function createTask(task) {
    setTasks((current) => [task, ...current]);
    setExtraDashboardTasks((current) => [
      {
        id: task.id,
        title: task.title,
        project: 'Web App',
        status: task.status,
        priority: task.priority,
        due: null,
      },
      ...current,
    ]);
    setCreateStatus(null);
  }

  // Unified destination router
  function handleNavigation(destination) {
    const routeMap = {
      dashboard: 'dashboard-home',
      overview: 'dashboard-home',
      tasks: 'my-tasks',
      'my tasks': 'my-tasks',
      projects: 'projects-list',
      inbox: 'inbox',
      members: 'members',
      settings: 'settings',
      'project-board': 'home',
    };

    const target = routeMap[destination?.toLowerCase()];
    if (target) {
      navigatePage(target);
    } else {
      window.alert(`${destination[0].toUpperCase()}${destination.slice(1)} is not a separate screen in this prototype yet.`);
    }
  }

  // Route 1: Landing Marketing Screen
  if (page === 'landing') {
    return <LandingPage onEnterWorkspace={() => navigatePage('dashboard-home')} />;
  }

  // Route 2: Dashboard Overview Screen
  if (page === 'dashboard-home') {
    return (
      <>
        <Dashboard
          extraTasks={extraDashboardTasks}
          onNavigate={handleNavigation}
          onCreateTask={() => setCreateStatus('Backlog')}
        />
        {createStatus && (
          <div
            className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs"
            onMouseDown={(event) => event.target === event.currentTarget && setCreateStatus(null)}
          >
            <aside
              className="w-full max-w-lg h-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col gap-4 border-l border-tf-line animate-in slide-in-from-right duration-200"
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-title"
            >
              <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-tf-line">
                <span>Product Team <span className="text-stone-300">/</span> New task</span>
                <button
                  className="w-8 h-8 rounded-lg border border-tf-line hover:bg-stone-50 text-stone-500 hover:text-stone-900 grid place-items-center text-lg transition-colors"
                  onClick={() => setCreateStatus(null)}
                  aria-label="Close form"
                >
                  ×
                </button>
              </div>
              <h2 id="create-title" className="font-display font-extrabold text-xl text-tf-ink tracking-tight">
                Create a task
              </h2>
              <CreateTaskForm
                defaultStatus={createStatus}
                onCancel={() => setCreateStatus(null)}
                onCreate={createTask}
              />
            </aside>
          </div>
        )}
      </>
    );
  }

  // Route 3: Personal Assigned Tasks Screen
  if (page === 'my-tasks') {
    return <MyTasks onNavigate={handleNavigation} />;
  }

  // Route 4: Workspace Projects Listing Screen
  if (page === 'projects-list') {
    return (
      <Projects
        onNavigate={handleNavigation}
        onOpenProject={(name) => {
          setSelectedProject(name);
          navigatePage('home');
        }}
      />
    );
  }

  // Route 5: Team Inbox & Notifications Screen
  if (page === 'inbox') {
    return (
      <Inbox
        onNavigate={handleNavigation}
        onOpenProject={(name) => {
          setSelectedProject(name);
          navigatePage('home');
        }}
        onOpenTask={(task) => {
          setSelectedTask(task);
        }}
      />
    );
  }

  // Route 6: Workspace Sprint / Project Board View
  if (page === 'home') {
    return (
      <WorkspaceHome
        projectName={selectedProject}
        onEnterWorkspace={() => navigatePage('dashboard-home')}
        onGoToDashboard={() => navigatePage('dashboard-home')}
        onOpenInbox={() => navigatePage('inbox')}
      />
    );
  }

  // Route 7: Workspace Team Members Screen
  if (page === 'members') {
    return <Members onNavigate={handleNavigation} />;
  }

  // Route 8: Workspace Settings Screen
  if (page === 'settings') {
    return <Settings onNavigate={handleNavigation} />;
  }

  // Route 7: Website Redesign / Project Delivery Board Fallback View
  return (
    <div className="min-h-screen bg-tf-bg text-tf-ink font-sans flex flex-col md:grid md:grid-cols-[226px_minmax(0,1fr)]" id="top">
      <Sidebar
        activePage="Projects"
        onNavigate={handleNavigation}
      />
      <main className="min-w-0 flex flex-col pb-12">
        <Topbar onNavigate={handleNavigation} />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col gap-6">
          <button
            className="text-xs font-bold text-brand-dark hover:underline self-start"
            onClick={() => navigatePage('dashboard-home')}
          >
            ← Back to dashboard
          </button>
          <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs text-stone-400 font-semibold flex items-center gap-2 mb-1">
                MONDAY, OCTOBER 12, 2026 <span className="text-stone-300">·</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> All changes saved
                </span>
              </p>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-tf-ink">
                Website redesign
              </h1>
              <p className="mt-1 text-sm text-tf-ink-2">
                A fresh look for the next chapter of Northstar.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="h-9 px-4 rounded-lg border border-tf-line bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors shadow-2xs"
                onClick={() => window.alert('Share link copied')}
              >
                ↗ Share
              </button>
              <button
                className="h-9 px-4 rounded-lg bg-tf-ink hover:bg-stone-800 text-white text-xs font-semibold transition-colors shadow-2xs"
                onClick={() => setCreateStatus('Backlog')}
              >
                ＋ Add task
              </button>
            </div>
          </section>

          <SummaryCards />
          <TaskBoard
            tasks={tasks}
            onOpenTask={setSelectedTask}
            onCreateTask={setCreateStatus}
          />
          <p className="text-center text-xs text-stone-400 mt-2 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live updates on <span className="text-stone-300">·</span> Last synced just now
          </p>
        </div>
      </main>

      {/* Detail & Create Drawers */}
      {selectedTask && (
        <TaskDrawer task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
      {createStatus && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs"
          onMouseDown={(event) => event.target === event.currentTarget && setCreateStatus(null)}
        >
          <aside
            className="w-full max-w-lg h-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col gap-4 border-l border-tf-line animate-in slide-in-from-right duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-title-default"
          >
            <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-tf-line">
              <span>Website redesign <span className="text-stone-300">/</span> New task</span>
              <button
                className="w-8 h-8 rounded-lg border border-tf-line hover:bg-stone-50 text-stone-500 hover:text-stone-900 grid place-items-center text-lg transition-colors"
                onClick={() => setCreateStatus(null)}
                aria-label="Close form"
              >
                ×
              </button>
            </div>
            <h2 id="create-title-default" className="font-display font-extrabold text-xl text-tf-ink tracking-tight">
              Create a task
            </h2>
            <CreateTaskForm
              defaultStatus={createStatus}
              onCancel={() => setCreateStatus(null)}
              onCreate={createTask}
            />
          </aside>
        </div>
      )}
    </div>
  );
}
