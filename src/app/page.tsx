'use client';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push('/login');
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <Image
            src="https://raw.githubusercontent.com/codeguyakash/com.pooh.codeguyakash/main/src/assets/icons/pooh.png"
            alt="Pooh Icon"
            width={200}
            height={200}
          />
          <h1 className="text-center font-bold text-2xl mt-4">
            Pooh (Dashboard)
          </h1>

          <Button className="px-8 py-2 mt-2" onClick={handleNavigate}>
            Login
          </Button>
        </div>
      </Suspense>
    </>
  );
}
