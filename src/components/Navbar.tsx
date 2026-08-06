import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-sm font-semibold tracking-normal text-slate-950 transition hover:text-slate-700 dark:text-white dark:hover:text-zinc-300">
          Batch 1346 - Ankit Tiwari
        </Link>
        <button
          type="button"
          onClick={() => setIsDark((value) => !value)}
          className="grid size-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>
      </nav>
    </header>
  );
}
