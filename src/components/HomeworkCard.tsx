import { ClipboardList } from 'lucide-react';
import type { Homework } from '../data/homework';
import { formatDate } from '../lib/homework';
import { Button } from './Button';

type HomeworkCardProps = {
  homework: Homework;
  homeworkNumber: number;
  detailsPath: string;
};

export function HomeworkCard({ homework, homeworkNumber, detailsPath }: HomeworkCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className="grid size-11 place-items-center rounded-md bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-100">
            <ClipboardList size={20} aria-hidden="true" />
          </span>
          <span className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-zinc-800 dark:text-zinc-400">
            #{homeworkNumber}
          </span>
        </div>
        <h2 className="text-lg font-semibold tracking-normal text-slate-950 dark:text-white">{homework.title}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">{formatDate(homework.date)}</p>
      </div>
      <Button to={detailsPath} variant="secondary" className="mt-6 w-full">
        View Details
      </Button>
    </article>
  );
}
