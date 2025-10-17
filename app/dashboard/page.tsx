'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  // Redirect to leads page (main dashboard)
  useEffect(() => {
    if (session?.user) {
      router.push('/leads');
    }
  }, [session, router]);

  // Show loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to CRM...</p>
      </div>
    </div>
  );
}