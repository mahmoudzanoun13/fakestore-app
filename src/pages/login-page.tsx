import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';
import { login } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { LogIn, Eye, EyeOff } from 'lucide-react';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const loginUser = useAuthStore((state) => state.login);

  // Get the redirect path from location state, or default to home
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const token = await login(data.username, data.password);
      loginUser(token, data.username);
      toast.success('Successfully logged in!');
      navigate(from, { replace: true });
    } catch {
      toast.error('Invalid username or password');
    }
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Username"
            placeholder="mor_2314"
            {...register('username')}
            error={errors.username?.message}
            autoComplete="username"
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            autoComplete="current-password"
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted hover:text-primary transition-colors focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />

          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-bold shadow-md shadow-primary/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner size="sm" className="border-white" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        </form>

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
