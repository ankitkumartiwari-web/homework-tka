export type Homework = {
  id: number;
  title: string;
  slug: string;
  date: string;
  description: string;
  live: string;
  github?: string;
  image?: string;
  teacherNotes?: string;
  conceptsLearned?: string[];
};

export type HomeworkDay = {
  day: string;
  label: string;
  homeworks: Homework[];
};

export type Subject = {
  subject: string;
  days: HomeworkDay[];
};

export const homework: Subject[] = [
  {
    subject: 'HTML',
    days: [
      {
        day: '6-aug-2026',
        label: '6 Aug 2026',
        homeworks: [
          {
            id: 1,
            title: 'List Project',
            slug: 'list-project',
            date: '2026-08-06',
            description: 'HTML list project created on 6 Aug 2026.',
            live: '/homework/html/6-aug-2026/aug6.html',
          },
          {
            id: 2,
            title: 'Navigation Bar',
            slug: 'navigation-bar',
            date: '2026-08-06',
            description: 'HTML navigation bar project created on 6 Aug 2026.',
            live: '/homework/html/6-aug-2026/nav.html',
          },
        ],
      },
    ],
  },
];
