'use client';

// Platform Layout Component
// Wraps all authenticated pages with sidebar navigation

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Sidebar from './Sidebar';

interface PlatformLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function PlatformLayout({ children, title, subtitle }: PlatformLayoutProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Redirect to login if not authenticated
  if (!isPending && !session) {
    router.push('/login');
    return null;
  }

  // Show loading state
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] flex">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-gradient-to-r from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] border-b border-[#DC2626]/20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Toggle and Title */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2F2F2F] text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                {title && (
                  <div>
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                    {subtitle && (
                      <p className="text-gray-400 text-sm">{subtitle}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Right side - User menu */}
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="p-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2F2F2F] text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>

                {/* User profile */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {session?.user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-white text-sm font-semibold">
                      {session?.user?.name || 'User'}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>

                {/* Sign out */}
                <button
                  onClick={async () => {
                    await authClient.signOut();
                    router.push('/');
                  }}
                  className="px-3 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
