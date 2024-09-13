import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const cronSecret = process.env.CRON_SECRET;
  const webhookUrl = process.env.VERCEL_WEBHOOK_URL;

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!webhookUrl) {
    console.log("Webhook doesn't find");
    return NextResponse.json(
      { error: 'Webhook URL not found' },
      { status: 505 },
    );
  }
  try {
    const response = await fetch(webhookUrl!, {
      method: 'POST',
    });
    if (response.ok) {
      console.log('Cron job completed successfully: ', response.status);
      return NextResponse.json(
        { message: 'Cron jobs completed successfully: ' },
        { status: response.status },
      );
    } else
      console.log('Cron job not completed successfully: ', response.status);
  } catch (error) {
    console.error('Error running cron job:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

export const dynamic = 'force-dynamic';
