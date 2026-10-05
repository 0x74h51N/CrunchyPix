import supabase from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// Free-tier Supabase projects pause after a period of inactivity, so ping the
// database directly instead of relying only on the rebuild to touch it.
const pingSupabase = async () => {
  const { error } = await supabase
    .schema('policy_schema')
    .from('policies')
    .select('policy_name')
    .limit(1);
  return error ? error.message.slice(0, 200) : null;
};

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const cronSecret = process.env.CRON_SECRET;
  const webhookUrl = process.env.VERCEL_WEBHOOK_URL;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseError = await pingSupabase();
  if (supabaseError) {
    console.error('Cron Supabase ping failed:', supabaseError);
  }

  if (!webhookUrl) {
    console.error('Cron: VERCEL_WEBHOOK_URL is not set');
    return NextResponse.json(
      { supabase: supabaseError ?? 'ok', rebuild: 'skipped: no webhook URL' },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(webhookUrl, { method: 'POST' });
    if (!response.ok) {
      console.error('Cron rebuild hook failed:', response.status);
    }
    return NextResponse.json(
      { supabase: supabaseError ?? 'ok', rebuild: response.status },
      { status: response.ok && !supabaseError ? 200 : 500 },
    );
  } catch (error) {
    console.error('Error running cron job:', error);
    return NextResponse.json(
      {
        supabase: supabaseError ?? 'ok',
        rebuild: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export const dynamic = 'force-dynamic';
