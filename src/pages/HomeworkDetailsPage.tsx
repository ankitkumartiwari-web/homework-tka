import { Calendar, CheckCircle2, ClipboardList, FolderGit2 } from 'lucide-react';
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
                <Button href={homework.github} variant="secondary" icon={<FolderGit2 size={16} aria-hidden="true" />}>
                  View GitHub Repository
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

