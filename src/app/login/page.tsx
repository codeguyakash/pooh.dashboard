'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type Credentials = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    root?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange =
    (key: keyof Credentials) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined, root: undefined })); // reset field + root errors on edit
    };

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const validate = () => {
    const next: typeof errors = {};
    if (!credentials.email.trim()) next.email = 'Email is required.';
    else if (!isValidEmail(credentials.email))
      next.email = 'Enter a valid email.';
    if (!credentials.password) next.password = 'Password is required.';
    else if (credentials.password.length < 6)
      next.password = 'Min 6 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const canSubmit = useMemo(() => {
    return (
      credentials.email.trim().length > 0 &&
      credentials.password.length >= 6 &&
      isValidEmail(credentials.email) &&
      !isSubmitting
    );
  }, [credentials, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, root: undefined }));

    console.log('HERE', credentials);

    try {
      toast('Login Success');
      return;
      // Hit your auth endpoint
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || 'Invalid credentials.');
      }

      // Auth success — redirect to dashboard
      router.replace('/dashboard');
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, root: err.message || 'Login failed.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-3 rounded-2xl border p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Login</h1>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={credentials.email}
            onChange={onChange('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={credentials.password}
            onChange={onChange('password')}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <p id="password-error" className="text-sm text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        {/* Form-level error */}
        {errors.root && (
          <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            {errors.root}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={!canSubmit}>
          {isSubmitting ? 'Signing in…' : 'Login'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By continuing, you acknowledge our SLA is “best effort”—we ship, we
          fix, we move on.
        </p>
      </form>
    </div>
  );
}
