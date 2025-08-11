'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type User = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  role: string;
  avatar_url: string;
  is_verified: boolean;
  fcm_token?: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      console.log(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-8">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-12">
        Dashboard
      </h1>

      {user ? (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-indigo-200 p-8 flex flex-col items-center gap-6">
          <Image
            className="rounded-full border-4 border-indigo-300"
            src={
              user.avatar_url ||
              'https://raw.githubusercontent.com/codeguyakash/com.pooh.codeguyakash/main/src/assets/icons/pooh.png'
            }
            alt="User Avatar"
            width={180}
            height={180}
            priority
          />

          <div className="text-center space-y-2">
            <h2 className="text-lg font-semibold text-indigo-900">
              {user.name}
            </h2>
            <p className="text-sm text-indigo-600 italic">UUID: {user.uuid}</p>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 text-indigo-700 text-sm font-medium">
            <div className="flex ">
              <span className="text-gray-500">ID :</span>
              <span>{user?.id}</span>
            </div>
            <div className="flex ">
              <span className="text-gray-500">Email :</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex ">
              <span className="text-gray-500">Role : </span>
              <span>{user?.role}</span>
            </div>
            <div className="flex ">
              <span className="text-gray-500">Verified :</span>
              <span>{JSON.stringify(user?.is_verified)}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500">FCM Token :</span>
              <span className="break-all text-xs">
                {JSON.stringify(user.fcm_token)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-indigo-700 text-lg">No user data found.</p>
      )}
    </div>
  );
}
