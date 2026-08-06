import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { HomeworkDay } from '../data/homework';
import { getDayTitle } from '../lib/homework';

type DayCardProps = {
  day: HomeworkDay;
  subjectSlug: string;
};

export function DayCard({ day, subjectSlug }: DayCardProps) {
  return (
    <Link
      to={`/subject/${subjectSlug}/day/${day.day}`}
      className="group flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-soft dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-100">
          <CalendarDays size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-normal text-slate-950 dark:text-white">{getDayTitle(day)}</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
            {day.homeworks.length} {day.homeworks.length === 1 ? 'Homework' : 'Homework'}
          </p>
        </div>
      </div>
      <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-slate-700 dark:text-zinc-300">
        Open
        <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
