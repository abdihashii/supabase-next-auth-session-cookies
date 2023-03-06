// We need middleware because cookies in server components are read-only
// Whenever we use the nextjs auth helpers, we need to use middleware to call getSession

import { NextResponse } from 'next/server';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Creates an empty response object
  const res = NextResponse.next();

  // Uses the req and res to create a new Supabase client
  const supabase = createMiddlewareSupabaseClient({ req, res });

  // Refreshes the users session token if it expired
  await supabase.auth.getSession();

  return res;
}
