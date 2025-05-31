'use server';
import { ContactSchema, ContactTypes } from '@/lib/schemas';
import { ContactFormData } from '@/lib/types/common.types';
import nodemailer from 'nodemailer';
import xss from 'xss';

export async function sendEmail(
  _prevState: ContactFormData,
  formData: FormData,
): Promise<ContactFormData> {
  try {
    const parsed = ContactSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      turnstileToken: formData.get('turnstileToken'),
    } as ContactTypes);

    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors };
    }
    const { name, email, message, turnstileToken } = parsed.data;

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY!;
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      },
    );

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      return {
        errors: {
          turnstileToken: ['contact.data-tips.chaptcha'],
        },
      };
    }
    const sanitizedEmail = xss(email);
    const sanitizedMessage = xss(message);
    const sanitizedName = xss(name);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    const mailOptionsToSelf = {
      from: process.env.SMTP_USER!,
      to: 'info@crunchypix.com',
      subject: `New message from ${sanitizedName}`,
      text: `You have received a new message from: ${sanitizedEmail}\n\n${sanitizedMessage}`,
      replyTo: sanitizedEmail,
    };

    await transporter.sendMail(mailOptionsToSelf);

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('sendEmail server error:', error);

    return {
      success: false,
      message: 'contact.submitFail',
      errors: {
        name: [],
        email: [],
        message: [],
        turnstileToken: [],
      },
    };
  }
}
