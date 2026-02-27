import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
      <div className="relative mb-8">
        <div className="text-[120px] sm:text-[180px] font-black text-primary/5 select-none leading-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
            <Search size={40} />
          </div>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground mb-4 tracking-tight">
        Oops! Page not found
      </h1>
      <p className="text-muted text-lg mb-10 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button onClick={() => navigate('/')} size="lg" className="flex items-center gap-2 px-8">
          <Home size={18} />
          Back to Home
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          size="lg"
          className="px-8 font-semibold"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};
