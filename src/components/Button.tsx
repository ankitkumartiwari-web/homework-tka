import { ArrowUpRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonBaseProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

type ButtonProps = ButtonBaseProps & {
  to?: string;
  href?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

const styles = {
  primary:
    'bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200',
  secondary:
    'border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700',
  ghost:
    'text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-900',
};

const base =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-zinc-500 dark:focus:ring-offset-zinc-950';

export function Button({ children, icon, variant = 'primary', to, className = '', ...props }: ButtonProps) {
  const classes = `${base} ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  if (props.href) {
    return (
      <a className={classes} target="_blank" rel="noreferrer" {...props}>
        {children}
        {icon ?? <ArrowUpRight size={16} aria-hidden="true" />}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {icon}
    </button>
  );
}
