# TaskForge frontend

This is the React + Vite frontend for the TaskForge project.

## Start the app

1. Install [Node.js](https://nodejs.org/) if it is not installed already.
2. Open a terminal in this folder.
3. Run `npm install` once to download the frontend packages.
4. Run `npm run dev` and open the local address Vite prints (usually `http://localhost:5173`).

## Where the files live

- `index.html` — browser entry page used by Vite.
- `src/main.jsx` — starts the React app.
- `src/App.jsx` — puts the main page pieces together and manages page state.
- `src/components/LandingPage.jsx` and `src/components/LandingPage.css` — the public landing page and its page-specific styles.
- `src/components/AppShell.jsx` — shared dashboard navigation, workspace header, icons, and avatars.
- `src/components/Dashboard.jsx` and `src/components/dashboard.css` — the logged-in home dashboard and its responsive styling.
- `src/components/` — reusable interface parts such as the sidebar, task board, and task drawer.
- `src/data/tasks.js` — example project tasks and team member data.
- `src/styles.css` — colors, layout, responsive rules, and component styling.

The current interface uses sample data in the browser. It is ready to connect to the TaskForge API later.
The app opens on the landing page; its workspace buttons open the home dashboard. From there, Projects opens the sample project board.
