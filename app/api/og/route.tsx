import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const config = {
  runtime: 'nodejs',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Default Title';
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('URL parameter is missing', { status: 400 });
  }

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2'});
  await page.evaluate(() => {
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
      cookieBanner.style.animation = '';
      cookieBanner.style.transition = '';
      cookieBanner.style.display = 'none';
    }
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.animation = '';
      navbar.style.transition = '';
      navbar.style.visibility = 'hidden';
      navbar.style.opacity = '0';
    }
  });
  await new Promise(resolve => setTimeout(resolve, 1500));
  const screenshot = await page.screenshot({ type: 'jpeg', quality: 100 });
  await browser.close();

  return new NextResponse(screenshot, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
    },
  });
}
