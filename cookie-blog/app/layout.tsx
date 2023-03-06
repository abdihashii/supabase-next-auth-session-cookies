'use client';

import { useEffect, useState } from 'react';
// import { createClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [supabase] = useState(() =>
  //   createClient(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   ),
  // );

  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    // listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // refresh data
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signUp = () => {
    supabase.auth.signUp({
      email: 'abdirahman.haji.13@gmail.com',
      password: 'password1',
    });
  };

  const signIn = () => {
    supabase.auth.signInWithPassword({
      email: 'abdirahman.haji.13@gmail.com',
      password: 'password1',
    });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <html lang="en">
      <body>
        <button onClick={signUp}>Sign Up</button>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signOut}>Sign Out</button>
        {children}
      </body>
    </html>
  );
}
