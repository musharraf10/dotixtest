import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
        ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
}

function Layout() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold">Job Scheduler</h1>
              <div className="flex gap-2">
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/create">Create Job</NavLink>
              </div>
            </div>

            {/* 🌗 Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium
                bg-gray-100 dark:bg-gray-800
                text-gray-800 dark:text-gray-200
                border border-gray-300 dark:border-gray-700
                hover:bg-gray-200 dark:hover:bg-gray-700
                transition"
            >
              {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <AppRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
