import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { HomeworkCard } from '../components/HomeworkCard';
import { PageHeader } from '../components/PageHeader';
import { getDay, getDayTitle, getSubject, slugify } from '../lib/homework';
import { NotFoundPage } from './NotFoundPage';

export function DayPage() {
  const { subject: subjectSlug = '', day: dayNumber = '' } = useParams();
  const subject = getSubject(subjectSlug);
  const day = getDay(subject, dayNumber);

  if (!subject || !day) {
    return <NotFoundPage />;
  }

  const normalizedSubjectSlug = slugify(subject.subject);
  const dayTitle = getDayTitle(day);

  return (
    <>
      <PageHeader
        eyebrow={subject.subject}
        title={dayTitle}
        description={`${day.homeworks.length} homework ${day.homeworks.length === 1 ? 'entry' : 'entries'} available.`}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: subject.subject, to: `/subject/${normalizedSubjectSlug}` },
            { label: dayTitle },
          ]}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {day.homeworks.map((item, index) => (
            <HomeworkCard
              key={item.slug}
              homework={item}
              homeworkNumber={index + 1}
              detailsPath={`/subject/${normalizedSubjectSlug}/day/${day.day}/${item.slug}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
