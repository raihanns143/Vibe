import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Vibe UI error:', error, info.componentStack);
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#0A0A0C] px-5 py-12 text-neutral-100">
          <section
            className="w-full max-w-md rounded-2xl border border-neutral-800 bg-[#111115] p-6 text-center shadow-2xl"
            role="alert"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-red-900/50 bg-red-950/30 text-red-500">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </div>
            <h1 className="mt-4 text-base font-semibold">The demo view could not be rendered</h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              An unexpected interface error occurred. Your local demo data is safe and can be
              restored.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-none"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Retry demo
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
