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
            live: '/aug6.html',
            github:
              'https://github.com/ankitkumartiwari-web/homework-tka/blob/main/public/aug6.html',
          },
          {
            id: 2,
            title: 'Navigation Bar',
            slug: 'navigation-bar',
            date: '2026-08-06',
            description: 'HTML navigation bar project created on 6 Aug 2026.',
            live: '/nav.html',
            github:
              'https://github.com/ankitkumartiwari-web/homework-tka/blob/main/public/nav.html',
          },
        ],
      },

      {
        day: '7-aug-2026',
        label: '7 Aug 2026',
        homeworks: [
          {
            id: 3,
            title: 'Video and Image Embedding',
            slug: 'multimedia',
            date: '2026-08-07',
            description:
              'HTML multimedia project with an iframe, video, and image embedding.',
            live: '/homework/html/7-aug-2026/multimedia.html',
            github:
              'https://github.com/ankitkumartiwari-web/homework-tka/blob/main/public/homework/html/7-aug-2026/multimedia.html',
          },
          {
            id: 4,
            title: 'Resume with Images and Links',
            slug: 'resume',
            date: '2026-08-07',
            description: 'HTML resume project with images and links.',
            live: '/homework/html/7-aug-2026/resume.html',
            github:
              'https://github.com/ankitkumartiwari-web/homework-tka/blob/main/docs/homework/html/7-aug-2026/resume.html',
          },
        ],
      },
      {
        day: '10-aug-2026',
        label: '10 Aug 2026',
        homeworks: [
          {
            id: 5,
            title: 'Image and Table',
            slug: 'image-table',
            date: '2026-08-10',
            description: 'HTML project with an image and a table.',
            live: '/homework/html/10-aug-2026/image-table.html',
            github:
              'https://github.com/ankitkumartiwari-web/homework-tka/blob/main/public/homework/html/10-aug-2026/image-table.html',
          },
        ],
      },
      {
        day: '11-aug-2026',
        label: '11 Aug 2026',
        homeworks: [
          {
            id: 6,
            title: 'Student Table',
            slug: 'student-table',
            date: '2026-08-11',
            description: 'HTML table displaying student info with photos.',
            live: '/homework/html/11-aug-2026/table.html',
            github:
              'https://github.com/ankitkumartiwari-web/homework-tka/blob/main/public/homework/html/11-aug-2026/table.html',
          },
        ],
      },
      {
        day: '12-aug-2026',
        label: '12 Aug 2026',
        homeworks: [
          {
            id: 7,
            title: 'Instagram Login Form',
            slug: 'form',
            date: '2026-08-12',
            description:
              'HTML form styled as an Instagram login page with name, password, date of birth, and photo upload fields.',
            live: '/homework/html/12-aug-2026/form.html',
            github:
              'https://github.com/ankitkumartiwari-web/homework-tka/blob/main/public/homework/html/12-aug-2026/form.html',
          },
        ],
      },
      {
        day: '13-aug-2026',
        label: '13 Aug 2026',
        homeworks: [
          {
            id: 8,
            title: 'Form Tags',
            slug: 'form',
            date: '2026-08-13',
            description:
              'User Registration Page for Job is an HTML form designed to collect basic information from a job applicant.',
            live: '/homework/html/13-aug-2026/form.html',
            github:
              'https://github.com/ankitkumartiwari-web/homework-tka/blob/main/public/homework/html/13-aug-2026/formtag.html',
          },
        ],
      },
    ],
  },
];