import { useNavigate, useLocation } from 'react-router';
import { LoginForm } from '@/components/auth/login-form';
import { LogIn } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state, or default to home
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <div className="flex justify-center w-full py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full max-w-[400px] bg-white p-8 rounded-lg border border-border shadow-lg">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary shadow-inner">
            <LogIn size={28} />
          </div>
          <h1 className="text-3xl font-bold text-secondary-foreground text-center">Welcome Back</h1>
          <p className="text-muted text-sm text-center mt-2">
            Please enter your credentials to access your account
          </p>
        </div>

        <LoginForm onSuccess={handleLoginSuccess} />

        <div className="mt-10 p-4 bg-secondary/50 rounded-lg border border-border">
          <p className="text-[10px] uppercase font-bold text-muted tracking-wider mb-2 text-center">
            Demo Credentials
          </p>
          <div className="flex flex-col gap-2 items-center text-xs">
            <div className="flex justify-between w-full px-2">
              <span className="text-muted">User:</span>
              <code className="font-mono text-primary font-bold">mor_2314</code>
            </div>
            <div className="flex justify-between w-full px-2">
              <span className="text-muted">Pass:</span>
              <code className="font-mono text-primary font-bold">83r5^_</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
