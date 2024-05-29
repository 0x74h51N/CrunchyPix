import { NextRequest, NextResponse } from 'next/server';
import { getCldBlurImageUrl } from '@/utils/createCldBlur';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid image ID' }, { status: 400 });
  }

  try {
    const blurUrl = await getCldBlurImageUrl(id)

    return NextResponse.json({ blurUrl });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
