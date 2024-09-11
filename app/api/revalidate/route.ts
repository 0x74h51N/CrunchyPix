import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  const { secret } = await req.json();

  if (!secret || secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return NextResponse.json({ status: 401 });
  }

  revalidateTag('prismic');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
