import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

export const handler: Handler = async (event) => {
  // CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Verify secret authorization token
  const authHeader = event.headers['authorization'] || event.headers['Authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const expectedSecret = process.env.EMAIL_RELAY_SECRET || 'dynesis-secure-mail-relay-token-2026';

  if (!token || token !== expectedSecret) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Unauthorized: Invalid email relay secret' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { to, subject, text, html, from } = payload;

    if (!to || !subject) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required fields: to, subject' })
      };
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER || '';
    const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
    const defaultFrom = process.env.SMTP_FROM || (user ? `Dynesis Tech <${user}>` : 'Dynesis Tech');

    if (!user || !pass) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Server misconfiguration: SMTP_USER or SMTP_PASS environment variables are missing on Netlify' })
      };
    }

    // Connect via port 587 (unblocked on Netlify/AWS)
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });

    const info = await transporter.sendMail({
      from: from || defaultFrom,
      to,
      subject,
      text,
      html
    });

    console.log(`[Netlify Relay] Email sent successfully to ${to}, messageId: ${info.messageId}`);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: true, messageId: info.messageId })
    };
  } catch (err: any) {
    console.error('[Netlify Relay Error]:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: err?.message || 'Failed to send email' })
    };
  }
};
