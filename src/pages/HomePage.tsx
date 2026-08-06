import { FilePlus2 } from 'lucide-react';
import { SubjectCard } from '../components/SubjectCard';
import { PageHeader } from '../components/PageHeader';
import { homework } from '../data/homework';

export function HomePage() {
  return (
    <>
      <PageHeader
        eyebrow="Batch 1346"
        title="Ankit Tiwari Homework"
        description="Browse every subject, day, and homework entry from one static data file."
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {homework.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homework.map((subject) => (
              <SubjectCard key={subject.subject} subject={subject} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <div className="mx-auto grid size-11 place-items-center rounded-md bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-200">
              <FilePlus2 size={20} aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-lg font-semibold tracking-normal text-slate-950 dark:text-white">No homework added yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-zinc-400">
              Add your subjects and homework in src/data/homework.ts when you are ready.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
