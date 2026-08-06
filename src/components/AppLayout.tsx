import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
