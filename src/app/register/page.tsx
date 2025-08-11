'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import axios from 'axios';
import Link from 'next/link';

type Credentials = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const router = useRouter();

  const [credentials, setCredentials] = useState<Credentials>({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      credentials.email === '' ||
      credentials.password === '' ||
      credentials.name === ''
    ) {
      toast.error('Please fill all fields');
      return;
    }
    setIsLoading(true);

    try {
      const res = await axios.post(
        'https://itsakssh.vercel.app/api/v1/auth/register',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { data, success, message } = res.data;
      if (success && data) {
        const msg = message || 'Register Success!';
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success(msg);
        router.replace('/dashboard');
        setIsLoading(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg =
          err.response?.data?.message || err.message || 'Something Went Wrong';
        console.log('Error', msg);
        toast.error(msg);
      } else {
        console.log('Error', err);
        toast.error('Error Something Went Wrong');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-3 rounded-xl border p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Register</h1>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Akash"
            value={credentials.name}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                name: e.target.value,
              })
            }
          />
        </div>

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
            onChange={(e) =>
              setCredentials({
                ...credentials,
                email: e.target.value,
              })
            }
          />
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
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password: e.target.value,
              })
            }
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-yellow-800 hover:bg-yellow-900"
          disabled={false}>
          {isLoading ? 'Signing up…' : 'Register'}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Already have an account ?{' '}
          <Link href="/login" className="text-yellow-800 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
