import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
const prismicSecret = process.env.PRISMIC_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const { secret } = await req.json();

  if (!secret || secret !== prismicSecret) {
    console.log('Webhook secret mismatch');
    return NextResponse.json({ status: 401 });
  }

  revalidateTag('prismic');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
