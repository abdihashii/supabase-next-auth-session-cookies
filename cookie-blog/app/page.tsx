// import { createClient } from '@supabase/supabase-js';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

export default async function Posts() {
  // console.log('hello'); // shouldn't print in the client, only in the server aka the console in the terminal

  // We'll use this to get sessions in local storage
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  // );

  // We'll use this to get sessions in cookies
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { data: posts } = await supabase.from('posts').select('*');

  return (
    <div>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
