import { LoaderCircle } from 'lucide-react';

export const LoadingScreen = () => (
  <div
    className="flex min-h-[64vh] items-center justify-center"
    role="status"
    aria-live="polite"
    aria-label="Loading Vibe"
  >
    <div className="flex flex-col items-center gap-3 text-neutral-500">
      <LoaderCircle className="h-6 w-6 animate-spin text-red-500" aria-hidden="true" />
      <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Loading demo</span>
    </div>
  </div>
);
