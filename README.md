# Batch 1346 - Ankit Tiwari Homework

A frontend-only React, Vite, TypeScript, Tailwind CSS app for organizing daily homework.

## Add Homework

Edit only `src/data/homework.ts`.

```ts
export const homework: Subject[] = [
  {
    subject: 'Your Subject Name',
    days: [
      {
        day: 'date-slug',
        label: 'Your Date',
        homeworks: [
          {
            id: 1,
            title: 'Your Homework Title',
            slug: 'your-homework-slug',
            date: 'YYYY-MM-DD',
            description: 'Write your homework description.',
            github: 'https://github.com/your-link',
            live: 'https://your-live-demo-link',
            image: '/images/your-image-path.png',
          },
        ],
      },
    ],
  },
];
```

## Add A Subject

Edit only `src/data/homework.ts`.

```ts
{
  subject: 'Your Subject Name',
  days: [],
}
```

## Screenshots

Place screenshots in `public/images/` and reference them from `homework.ts` with a path that starts with `/images/`.

## Local Development

```bash
npm install
npm run dev
```

## GitHub Pages Deployment

This project uses `base: '/homework-tka/'` in `vite.config.ts` so built assets work from the GitHub Pages project path.

GitHub Pages is automated through `.github/workflows/deploy.yml`.

To publish it:

1. Push the repo to GitHub.
2. In GitHub, open `Settings` > `Pages`.
3. Set the source to `GitHub Actions`.
4. Push to `main` or `master`, or run the `Deploy to GitHub Pages` workflow manually.

```bash
npm run build
```

The workflow uploads the `dist` folder and deploys it to your Pages site.

Homework files placed under `docs/homework/<subject>/<date>/` are synchronized
to `public/homework/`, added to the website catalog, and published
automatically. For example, adding
`docs/homework/python/6-oct-2026/example.py` makes it live at
`/homework/python/6-oct-2026/example.py` after the build workflow completes.

The date folder must use the format `6-oct-2026`. The generated catalog uses
the filename as the title and links back to the file in GitHub. Python (`.py`)
and DBMS (`.sql`) files also get a matching dark code-viewer page with the
same filename and an `.html` extension.
