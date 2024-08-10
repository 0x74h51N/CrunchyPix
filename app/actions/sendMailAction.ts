'use server';
import { ContactSchema, ContactTypes } from '@/schemas';
import nodemailer from 'nodemailer';
import xss from 'xss';

export async function sendEmail(data: ContactTypes) {
  const parsed = ContactSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid input data');
  }

  const { name, email, message, turnstileToken } = parsed.data;

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY!;
  const turnstileResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: turnstileToken,
      }),
    },
  );

  const turnstileData = await turnstileResponse.json();

  if (!turnstileData.success) {
    throw new Error('Invalid CAPTCHA');
  }

  const sanitizedEmail = xss(email);
  const sanitizedMessage = xss(message);
  const sanitizedName = xss(name);

  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    console.log('Env variable errors');
    throw new Error('Missing environment variables');
  }

  const params = new URLSearchParams();
  params.append('refresh_token', refreshToken);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'refresh_token');

  const tokenResponse = await fetch(
    'https://accounts.zoho.com/oauth/v2/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
      next: { revalidate: 3600 },
    },
  );

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;
  console.log(tokenData);
  if (!accessToken) {
    throw new Error('Failed to obtain access token');
  }

  const listKey = process.env.ZOHO_LIST_KEY;
  if (!listKey) {
    console.log('List key env variable errors');
    throw new Error('Missing list key environment variable');
  }

  const subscribeResponse = await fetch(
    `https://campaigns.zoho.com/api/v1.1/json/listsubscribe?resfmt=JSON&listkey=${listKey}&contactinfo=${encodeURIComponent(`{First Name:${sanitizedName},Contact Email:${sanitizedEmail}}`)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  const subscribeData = await subscribeResponse.json();
  if (!subscribeResponse.ok) {
    throw new Error(JSON.stringify(subscribeData));
  }

  if (subscribeData.code !== '0') {
    throw new Error(
      `Failed to subscribe user to list: ${JSON.stringify(subscribeData)}`,
    );
  }

  const transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_SMTP_USER!,
      pass: process.env.ZOHO_SMTP_PASS!,
    },
  });

  const mailOptionsToSelf = {
    from: 'no-reply@crunchypix.com',
    to: 'info@crunchypix.com',
    subject: `New message from ${sanitizedName}`,
    text: `You have received a new message from: ${sanitizedEmail}\n\n${sanitizedMessage}`,
    replyTo: sanitizedEmail,
  };

  await transporter.sendMail(mailOptionsToSelf);

  return { success: true, message: 'Subscription and email sent successfully' };
}
