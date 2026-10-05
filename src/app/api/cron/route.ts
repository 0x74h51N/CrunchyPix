import supabase from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// Free-tier Supabase projects pause after a period of inactivity; a daily
// query keeps it awake.
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (
    !cronSecret ||
    req.headers.get('Authorization') !== `Bearer ${cronSecret}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .schema('policy_schema')
    .from('policies')
    .select('policy_name')
    .limit(1);

  if (error) {
    console.error('Cron Supabase ping failed:', error.message.slice(0, 200));
    return NextResponse.json(
      { error: 'Supabase ping failed' },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}

export const dynamic = 'force-dynamic';
