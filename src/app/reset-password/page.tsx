'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import Image from 'next/image';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting password reset', { token, newPassword });
    try {
      const res = await axios.post(
        'https://itsakssh.vercel.app/reset-password',
        {
          token,
          newPassword,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('Res', res);
      console.log('Res Data', res.data);
      if (res.data.success) {
        const msg = res.data.message || 'Password Reset successfully';
        toast.success(msg);
        router.replace('/login');
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
  };

  return (
    <div className="w-full max-w-md rounded-lg shadow p-6">
      <Image
        src="/pooh.png"
        alt="pooh"
        className="mx-auto mb-4 h-48 object-contain"
        height={192}
        width={192}
      />
      <h1 className="text-center text-2xl font-semibold mb-2">New Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="token" value={token} />
        <label htmlFor="new-password" className="block text-sm font-medium">
          New Password:
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="new-password"
          name="newPassword"
          placeholder="Enter New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 dark:text-white dark:bg-black"
        />
        <span
          className="text-xs text-blue-600 text-right block cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide Password' : 'Show Password'}
        </span>
        <button
          type="submit"
          className="w-full bg-orange-700 hover:bg-orange-800 text-white font-semibold px-4 py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
      <footer className="mt-20 text-center">
        <a
          href="https://codeguyakash.in"
          className="text-gray-400 hover:underline">
          @codeguyakash
        </a>
      </footer>
    </div>
  );
}
