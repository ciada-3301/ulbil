"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SeniorModeProvider } from '@/components/providers/SeniorModeProvider';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isUnlistedApp = pathname?.startsWith('/emails');

  if (isUnlistedApp) {
    return <main className="min-h-screen flex flex-col">{children}</main>;
  }

  return (
    <SeniorModeProvider>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </SeniorModeProvider>
  );
}
