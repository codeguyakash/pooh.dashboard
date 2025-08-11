'use client';
import React, { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1 className="text-center mt-[20px]">Hello</h1>
    </Suspense>
  );
}
