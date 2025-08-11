'use client';
import React, { Suspense } from 'react';
// import ResetPasswordPage from './reset-password/page';
// import { useSearchParams } from 'next/navigation';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <ResetPasswordPage /> */}
      <h1>Hello</h1>
    </Suspense>
  );
}
