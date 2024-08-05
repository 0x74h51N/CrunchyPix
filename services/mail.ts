'use server';
import { createTranslation } from '@/i18n/server';
import { readFile } from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';

import { promisify } from 'util';

const readFileAsync = promisify(readFile);

export const sendEmail = async (
  name: string,
  email: string,
  message: string,
) => {
  const { t } = await createTranslation('index');
  const templatePath = path.join(
    process.cwd(),
    'services',
    'mailTemplate.html',
  );
  let htmlTemplate;
  try {
    htmlTemplate = await readFileAsync(templatePath, 'utf-8');
  } catch (err) {
    console.error('Error reading HTML template:', err);
    throw new Error('Failed to read email template.');
  }

  htmlTemplate = htmlTemplate
    .replace('{{mailHello}}', t('mail.mailHello'))
    .replace('{{name}}', name)
    .replace('{{mailTitle}}', t('mail.mailTitle'))
    .replace('{{mailText}}', t('mail.mailText'))
    .replace('{{endText}}', t('mail.endText'))
    .replace('{{contactUs}}', t('mail.contactUs'))
    .replace('{{crunchyBotDescription}}', t('mail.crunchyBotDescription'))
    .replace('{{footerTitle}}', t('footer.title'))
    .replace('{{footerDescription}}', t('footer.description'))
    .replace('{{footerText}}', t('mail.footerText'))
    .replace('{{footerText2}}', t('mail.footerText2'))
    .replace('{{footerPrivacy}}', t('mail.footerPrivacy'))
    .replace('{{footerKVKK}}', t('mail.footerKVKK'));

  const transporter = nodemailer.createTransport({
    host: 'email-smtp.eu-north-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.AWS_SMTP_USER,
      pass: process.env.AWS_SMTP_PASS,
    },
  });

  const mailOptionsToSelf = {
    from: 'info@crunchypix.com',
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: `You have received a new message from: ${email}\n\n${message}`,
    replyTo: email,
  };

  const mailOptionsToUser = {
    from: 'info@crunchypix.com',
    to: email,
    subject: t('mail.subject'),
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptionsToSelf);
  await transporter.sendMail(mailOptionsToUser);
};
