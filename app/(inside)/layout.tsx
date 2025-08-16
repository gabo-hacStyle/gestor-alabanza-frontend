import UserHeader from '@/components/UserHeader';
import Navigation from '@/components/Navigation';
import React from 'react';

export default function InsideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <UserHeader />
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
