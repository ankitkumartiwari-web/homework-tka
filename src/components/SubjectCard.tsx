import { ArrowRight, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Subject } from '../data/homework';
import { getSubjectStats, slugify } from '../lib/homework';

export function SubjectCard({ subject }: { subject: Subject }) {
  const stats = getSubjectStats(subject);
  const isAvailable = stats.totalHomework > 0;

  return (
    <Link
      to={`/subject/${slugify(subject.subject)}`}
      className="group flex min-h-44 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-md bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-100">
          <BookMarked size={20} aria-hidden="true" />
        </span>
        <ArrowRight size={18} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-800 dark:group-hover:text-zinc-100" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-xl font-semibold tracking-normal text-slate-950 dark:text-white">{subject.subject}</h2>
        {isAvailable ? (
          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
            {stats.totalDays} {stats.totalDays === 1 ? 'Date' : 'Dates'}
            <span className="mx-2 text-slate-300 dark:text-zinc-700">/</span>
            {stats.totalHomework} Homework
          </p>
        ) : (
          <p className="mt-3 text-sm text-slate-500 dark:text-zinc-500">Coming Soon</p>
        )}
      </div>
    </Link>
  );
}

