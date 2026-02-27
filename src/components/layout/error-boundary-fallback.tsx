import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';

export const ErrorBoundaryFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-secondary/20 animate-in fade-in duration-500">
      <div className="max-w-2xl w-full min-w-[320px] bg-white p-8 sm:p-10 rounded-2xl border border-border shadow-2xl text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mb-8 text-danger border border-danger/20 shadow-inner shrink-0">
          <AlertCircle size={40} />
        </div>

        <h1 className="text-3xl font-black text-secondary-foreground mb-3 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted text-lg mb-8 leading-relaxed">
          An unexpected error occurred. Our team has been notified.
        </p>

        <div className="bg-secondary/50 p-4 rounded-lg text-left mb-10 overflow-auto max-h-48 border border-border w-full">
          <p className="text-[11px] font-mono text-danger wrap-break-word leading-tight">
            <span className="font-black uppercase opacity-50 block mb-1">Error Details:</span>
            {error instanceof Error ? error.message : 'An unknown error occurred'}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Button
            onClick={resetErrorBoundary}
            size="lg"
            className="w-full h-12 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            <RefreshCcw size={18} />
            Try Again
          </Button>
          <Button
            variant="secondary"
            onClick={() => (window.location.href = '/')}
            size="lg"
            className="w-full h-12 font-bold border border-border hover:bg-secondary/80 shadow-sm active:scale-95 transition-all"
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};
