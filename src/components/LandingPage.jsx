import React from 'react';
import { LogoMark } from './Icons.jsx';

/**
 * Sample columns and tasks displayed in the landing hero board preview
 */
const PREVIEW_COLUMNS = [
  {
    name: 'Backlog',
    accent: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    dot: 'bg-zinc-400',
    tasks: [
      { id: 'TF-042', priority: 'P2 · MED', due: 'Oct 09', title: 'Define workspace permissions', label: 'Product', owner: 'NR' },
      { id: 'TF-049', priority: 'P3 · LOW', due: 'Oct 14', title: 'Draft storage policy', label: 'Planning', owner: 'DP' },
    ],
  },
  {
    name: 'In progress',
    accent: 'bg-blue-50 text-blue-800 border-blue-200',
    dot: 'bg-blue-500',
    tasks: [
      { id: 'TF-038', priority: 'P1 · HIGH', due: 'Oct 11', title: 'Build activity feed', label: 'Product', owner: 'JL' },
      { id: 'TF-044', priority: 'P2 · MED', due: 'Oct 16', title: 'Improve board filters', label: 'Design', owner: 'SK' },
    ],
  },
  {
    name: 'In review',
    accent: 'bg-purple-50 text-purple-800 border-purple-200',
    dot: 'bg-purple-500',
    tasks: [
      { id: 'TF-035', priority: 'P2 · MED', due: 'Oct 07', title: 'Create project templates', label: 'Design', owner: 'JR' },
    ],
  },
];

const VALUE_PROPOSITIONS = [
  {
    step: '01',
    title: 'A clear home for work',
    description: 'Projects, owners, and deadlines stay tightly connected without cluttered tabs or spreadsheets.',
  },
  {
    step: '02',
    title: 'Small updates, shared fast',
    description: 'Team activity, comments, and task movements remain visible in real time for everyone.',
  },
  {
    step: '03',
    title: 'A history you can trust',
    description: 'Decision logs, state changes, and assignee notes are captured accurately as tasks move forward.',
  },
];

/**
 * Interactive preview of the TaskForge project board inside the hero section
 */
function BoardPreview() {
  return (
    <div
      className="w-full bg-white rounded-2xl border border-stone-200/90 shadow-2xl shadow-stone-900/10 overflow-hidden transform lg:hover:-translate-y-1 transition-transform duration-300"
      aria-label="TaskForge project board preview"
    >
      {/* Window Titlebar */}
      <div className="h-10 px-4 bg-stone-50 border-b border-stone-200/80 flex items-center justify-between text-xs text-stone-500 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-semibold text-stone-700">TaskForge Workspace</span>
        </div>
        <span className="hidden sm:inline text-stone-400 font-mono text-[11px]">Sprint 01 · MVP Board</span>
        <div className="flex items-center gap-1.5 text-stone-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-medium text-emerald-700">Live</span>
        </div>
      </div>

      {/* Board Header */}
      <div className="p-4 sm:p-5 bg-stone-50/50 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Workspace / TaskForge</span>
          <h2 className="text-base sm:text-lg font-display font-bold text-stone-900 leading-tight">MVP delivery board</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-[11px] font-bold">
            5 tasks active
          </span>
          <span className="px-2.5 py-1 rounded-full bg-stone-200/60 text-stone-700 text-[11px] font-medium">
            25% done
          </span>
        </div>
      </div>

      {/* Column Columns */}
      <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 bg-stone-100/40">
        {PREVIEW_COLUMNS.map((column) => (
          <section
            key={column.name}
            className="flex flex-col gap-2.5 p-3 rounded-xl bg-stone-50/80 border border-stone-200/60"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-stone-200/50">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${column.dot}`} />
                <h3 className="text-xs font-bold text-stone-800">{column.name}</h3>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white text-stone-500 border border-stone-200">
                0{column.tasks.length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {column.tasks.map((task) => (
                <article
                  key={task.id}
                  className="p-3 bg-white rounded-lg border border-stone-200/80 shadow-xs hover:border-lime-500/80 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] text-stone-500 mb-1.5">
                    <span className="font-semibold text-stone-600">{task.priority}</span>
                    <time>{task.due}</time>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 leading-snug mb-1">
                    {task.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mb-2">
                    Keep the team and sprint work moving forward.
                  </p>
                  <footer className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
                    <span className="w-5 h-5 rounded-full bg-stone-800 text-lime font-bold flex items-center justify-center text-[9px]">
                      {task.owner}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                      {task.label}
                    </span>
                    <span className="font-mono text-stone-400">{task.id}</span>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/**
 * TaskForge Landing Page Component
 * Fully refactored using clean Tailwind CSS utility classes and modern semantic HTML.
 */
export default function LandingPage({ onEnterWorkspace }) {
  return (
    <div className="min-h-screen bg-[#fbfcf8] text-[#20231f] font-sans antialiased selection:bg-lime selection:text-stone-900">
      {/* Global Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#fbfcf8]/90 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight text-stone-900 group"
            aria-label="TaskForge home"
          >
            <LogoMark size={32} className="shrink-0 group-hover:scale-105 transition-transform" />
            <span>Task<span className="text-[#759346]">Forge</span></span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600" aria-label="Main navigation">
            <a href="#features" className="hover:text-stone-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-stone-900 transition-colors">How it works</a>
            <a href="#teams" className="hover:text-stone-900 transition-colors">For teams</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onEnterWorkspace}
              className="text-xs sm:text-sm font-bold text-stone-700 hover:text-stone-900 px-3 py-2 transition-colors cursor-pointer"
            >
              Sign in
            </button>
            <button
              onClick={onEnterWorkspace}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#20231f] text-white text-xs sm:text-sm font-bold hover:bg-stone-800 transition-all shadow-sm shadow-stone-900/10 cursor-pointer"
            >
              Get started <span className="text-[#c6f36a]">↗</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="top">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-5 flex flex-col items-start">
              {/* Kicker Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f4e6] border border-[#e6ecd9] text-[#647348] text-xs font-bold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#759346]" />
                Project work, in one place
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.08] mb-6">
                Make the work <br className="hidden sm:inline" />
                visible. Move it <br className="hidden sm:inline" />
                <span className="text-[#759346]">forward together.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-lg">
                Plan projects, assign tasks, and track team progress without losing the decisions and details behind the work.
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={onEnterWorkspace}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#20231f] text-white text-sm font-bold hover:bg-stone-800 transition-all shadow-md shadow-stone-900/10 cursor-pointer"
                >
                  Create a workspace <span className="text-[#c6f36a] text-base">↗</span>
                </button>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-stone-300 bg-white text-stone-700 text-sm font-bold hover:bg-stone-50 transition-colors"
                >
                  See how it works <span className="text-[#759346]">→</span>
                </a>
              </div>

              <p className="text-xs text-stone-500 mt-6 flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Free for modern teams · No credit card required
              </p>
            </div>

            {/* Right Preview Column */}
            <div className="lg:col-span-7">
              <BoardPreview />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="features" className="border-t border-stone-200/80 bg-white/70 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#759346]">
                Designed for the way teams actually work
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 tracking-tight mt-2">
                Everything stays connected.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {VALUE_PROPOSITIONS.map((benefit) => (
                <article
                  key={benefit.step}
                  className="p-8 rounded-2xl bg-[#fafbf7] border border-stone-200/90 hover:border-[#759346]/60 hover:shadow-lg transition-all"
                >
                  <span className="inline-block font-display font-extrabold text-2xl text-[#759346] mb-4">
                    {benefit.step}
                  </span>
                  <h3 className="font-display font-bold text-lg text-stone-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl bg-[#edf3e5] border border-[#dce6d0] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <span id="teams" className="text-xs font-bold uppercase tracking-wider text-[#647348]">
                Your team's workspace starts here
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 tracking-tight mt-2 max-w-xl">
                Make room for the work that matters.
              </h2>
              <p className="text-sm text-stone-600 mt-3 max-w-lg">
                Join forward-thinking product, design, and engineering teams delivering with TaskForge.
              </p>
            </div>
            <button
              onClick={onEnterWorkspace}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#20231f] text-white text-base font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10 cursor-pointer"
            >
              Open workspace <span className="text-[#c6f36a]">↗</span>
            </button>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <LogoMark size={22} className="shrink-0" />
            <span className="font-bold text-stone-900">TaskForge</span>
            <span>· Thoughtful work, together.</span>
          </div>
          <p>© 2026 TaskForge. Built for high-velocity teams.</p>
        </div>
      </footer>
    </div>
  );
}
