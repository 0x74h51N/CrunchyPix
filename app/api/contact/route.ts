import { sendEmail } from '@/services/mail';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  try {
    const res = await sendEmail(name, email, message);
    console.log('Mail sent successfully:', res);
    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending mail:', error);
    return NextResponse.json(
      { message: 'Failed to send message.' },
      { status: 500 },
    );
  }
}
