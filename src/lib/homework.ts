import { homework, type Homework, type HomeworkDay, type Subject } from '../data/homework';

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getSubject(subjectSlug = '') {
  return homework.find((subject) => slugify(subject.subject) === subjectSlug.toLowerCase());
}

export function getDay(subject: Subject | undefined, daySlug = '') {
  return subject?.days.find((day) => day.day === daySlug);
}

export function getHomework(day: HomeworkDay | undefined, slug = '') {
  return day?.homeworks.find((item) => item.slug === slug);
}

export function getSubjectStats(subject: Subject) {
  return {
    totalDays: subject.days.length,
    totalHomework: subject.days.reduce((total, day) => total + day.homeworks.length, 0),
  };
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

export function getHomeworkNumber(day: HomeworkDay, homeworkItem: Homework) {
  return day.homeworks.findIndex((item) => item.slug === homeworkItem.slug) + 1;
}

export function getDayTitle(day: HomeworkDay) {
  return day.label;
}

export function getPublicAssetPath(path: string) {
  if (/^(https?:)?\/\//.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL === './' ? getRuntimeBasePath() : import.meta.env.BASE_URL;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

function getRuntimeBasePath() {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/';
  }

  const subjectIndex = window.location.pathname.indexOf('/subject/');

  if (subjectIndex > 0) {
    return `${window.location.pathname.slice(0, subjectIndex)}/`;
  }

  return '/';
}
