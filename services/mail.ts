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
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_SMTP_USER,
      pass: process.env.ZOHO_SMTP_PASS,
    },
  });

  const mailOptionsToSelf = {
    from: 'no-reply@crunchypix.com',
    to: 'info@crunchypix.com',
    subject: `New message from ${name}`,
    text: `You have received a new message from: ${email}\n\n${message}`,
    replyTo: email,
  };

  const mailOptionsToUser = {
    from: 'no-reply@crunchypix.com',
    to: email,
    subject: t('mail.subject'),
    html: htmlTemplate,
  };
  try {
    await transporter.sendMail(mailOptionsToSelf);
    await transporter.sendMail(mailOptionsToUser);
  } catch (error) {
    console.error('Error sending mail: ', error);
    throw new Error('Failed to send email.');
  }
};
