import { Calendar, CheckCircle2, ClipboardList } from 'lucide-react';
import type { ReactNode, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';
import { PageHeader } from '../components/PageHeader';
import {
  formatDate,
  getDay,
  getDayTitle,
  getHomework,
  getHomeworkNumber,
  getPublicAssetPath,
  getSubject,
  slugify,
} from '../lib/homework';
import { NotFoundPage } from './NotFoundPage';

export function HomeworkDetailsPage() {
  const { subject: subjectSlug = '', day: dayNumber = '', slug = '' } = useParams();
  const subject = getSubject(subjectSlug);
  const day = getDay(subject, dayNumber);
  const homework = getHomework(day, slug);

  if (!subject || !day || !homework) {
    return <NotFoundPage />;
  }

  const normalizedSubjectSlug = slugify(subject.subject);
  const homeworkNumber = getHomeworkNumber(day, homework);
  const dayTitle = getDayTitle(day);

  return (
    <>
      <PageHeader eyebrow={`${subject.subject} / ${dayTitle}`} title={homework.title} description={homework.description} />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: subject.subject, to: `/subject/${normalizedSubjectSlug}` },
            { label: dayTitle, to: `/subject/${normalizedSubjectSlug}/day/${day.day}` },
            { label: homework.title },
          ]}
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {homework.image ? (
              <div className="aspect-video bg-slate-100 dark:bg-zinc-800">
                <img
                  src={getPublicAssetPath(homework.image)}
                  alt={`${homework.title} screenshot`}
                  className="h-full w-full object-cover"
                  onError={(event: SyntheticEvent<HTMLImageElement>) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ) : null}
            <div className="p-6">
              <h2 className="text-xl font-semibold tracking-normal">Description</h2>
              <p className="mt-3 leading-7 text-slate-600 dark:text-zinc-400">{homework.description}</p>
              {homework.teacherNotes ? (
                <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <h3 className="text-sm font-semibold">Teacher Notes</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">{homework.teacherNotes}</p>
                </div>
              ) : null}
              {homework.conceptsLearned?.length ? (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold">Concepts Learned</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {homework.conceptsLearned.map((concept) => (
                      <span
                        key={concept}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                      >
                        <CheckCircle2 size={14} aria-hidden="true" />
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </article>
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="space-y-4">
              <Detail icon={<ClipboardList size={17} />} label="Homework Number" value={`#${homeworkNumber}`} />
              <Detail icon={<Calendar size={17} />} label="Submission Date" value={formatDate(homework.date)} />
              <Detail label="Subject" value={subject.subject} />
              <Detail label="Day" value={dayTitle} />
            </div>
            <div className="mt-6 grid gap-3">
              <Button href={getPublicAssetPath(homework.live)}>Open Project</Button>
              {homework.github ? (
                <Button href={homework.github} variant="secondary" icon={<GitHubMark />}>
                  View Code on GitHub
                </Button>
              ) : null}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Detail({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      {icon ? <span className="mt-0.5 text-slate-400 dark:text-zinc-500">{icon}</span> : null}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-500">{label}</p>
        <p className="mt-1 text-sm font-medium text-slate-900 dark:text-zinc-100">{value}</p>
      </div>
    </div>
  );
}

function GitHubMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48 0-.24-.01-1.04-.02-1.89-2.78.62-3.37-1.22-3.37-1.22-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.06 1.56 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.76 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.56 1.44.21 2.5.11 2.76.64.72 1.02 1.63 1.02 2.75 0 3.95-2.35 4.81-4.58 5.06.36.32.69.95.69 1.92 0 1.39-.01 2.5-.01 2.84 0 .26.18.59.69.49A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

