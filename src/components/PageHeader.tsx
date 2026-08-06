import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="border-b border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow ? <p className="mb-3 text-sm font-medium text-slate-500 dark:text-zinc-400">{eyebrow}</p> : null}
          <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">{title}</h1>
          {description ? <p className="mt-4 text-base leading-7 text-slate-600 dark:text-zinc-400">{description}</p> : null}
        </div>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
