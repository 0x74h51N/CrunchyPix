import { createBlurDataURL } from '@/utils/createBlurDataURL';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const image = searchParams.get('image');

  if (!image) {
    return new NextResponse('Image path is required', { status: 400 });
  }

  const imagePath = path.join(process.cwd(), 'public', image);

  if (!fs.existsSync(imagePath)) {
    return new NextResponse('Image not found', { status: 404 });
  }

  try {
    const blurDataURL = await createBlurDataURL(imagePath);
    return NextResponse.json({ blurDataURL });
  } catch (error) {
    console.error('Error creating blurDataURL:', error);
    return new NextResponse('Failed to create blurDataURL', { status: 500 });
  }
}
