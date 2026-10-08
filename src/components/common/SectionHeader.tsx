import { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const SectionHeader = ({ eyebrow, title, description, action }: SectionHeaderProps) => (
  <header className="flex flex-col gap-3 border-b border-neutral-900 px-1 pb-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {eyebrow && (
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-red-500">
          {eyebrow}
        </p>
      )}
      <h1 className="text-lg font-semibold tracking-tight text-white">{title}</h1>
      {description && (
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">{description}</p>
      )}
    </div>
    {action}
  </header>
);
