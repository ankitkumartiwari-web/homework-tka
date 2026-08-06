import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { DayCard } from '../components/DayCard';
import { PageHeader } from '../components/PageHeader';
import { getSubject, getSubjectStats, slugify } from '../lib/homework';
import { NotFoundPage } from './NotFoundPage';

export function SubjectPage() {
  const { subject: subjectSlug = '' } = useParams();
  const subject = getSubject(subjectSlug);

  if (!subject) {
    return <NotFoundPage />;
  }

  const stats = getSubjectStats(subject);

  return (
    <>
      <PageHeader eyebrow="Subject" title={subject.subject}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-slate-500 dark:text-zinc-400">Total Dates</p>
            <p className="mt-1 text-2xl font-semibold">{stats.totalDays}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-slate-500 dark:text-zinc-400">Total Homework</p>
            <p className="mt-1 text-2xl font-semibold">{stats.totalHomework}</p>
          </div>
        </div>
      </PageHeader>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: subject.subject }]} />
        {subject.days.length > 0 ? (
          <div className="grid gap-4">
            {subject.days.map((day) => (
              <DayCard key={day.day} day={day} subjectSlug={slugify(subject.subject)} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            Coming Soon
          </div>
        )}
      </section>
    </>
  );
}

