import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { login } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeOff } from 'lucide-react';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const loginUser = useAuthStore((state) => state.login);

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
      onSuccess();
    } catch {
      toast.error('Invalid username or password');
    }
  };

  return (
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
  );
};
