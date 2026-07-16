const nodemailer = require('nodemailer');

const getMailerStatus = () => {
  const smtpService = process.env.SMTP_SERVICE;
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpService && !smtpHost) {
    return 'disabled (no SMTP host/service configured)';
  }

  if (smtpService) {
    return `ready (${smtpService})`;
  }

  if (!smtpUser || !smtpPass) {
    return `ready (${smtpHost}:${process.env.SMTP_PORT || 587})`;
  }

  return `ready (${smtpHost}:${process.env.SMTP_PORT || 587})`;
};

const createTransporter = () => {
  const smtpService = process.env.SMTP_SERVICE;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : smtpPort === 465;

  if (smtpService) {
    const transportOptions = { service: smtpService };
    if (smtpUser && smtpPass) {
      transportOptions.auth = { user: smtpUser, pass: smtpPass };
    }
    return nodemailer.createTransport(transportOptions);
  }

  if (!smtpHost) {
    return null;
  }

  const transportOptions = {
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
  };

  if (smtpUser && smtpPass) {
    transportOptions.auth = {
      user: smtpUser,
      pass: smtpPass,
    };
  }

  return nodemailer.createTransport(transportOptions);
};

const sendEmail = async ({ to, subject, text, html }) => {
  if (!to) {
    return { ok: false, reason: 'missing-recipient' };
  }

  const transporter = createTransporter();
  if (!transporter) {
    console.log(`[email] SMTP not configured. Skipping email to ${to}`);
    return { ok: false, reason: 'smtp-not-configured' };
  }

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    });
    return { ok: true };
  } catch (error) {
    console.error('[email] Failed to send message', error);
    return { ok: false, reason: error.message };
  }
};

const generateTrackingId = () => {
  const stamp = Date.now().toString().slice(-6);
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `EYECON-${stamp}-${suffix}`;
};

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Order placed',
    processing: 'Order being processed',
    shipped: 'Order shipped',
    delivered: 'Order delivered',
    cancelled: 'Order cancelled',
  };
  return labels[status] || status;
};

const sendAccountWelcomeEmail = async (user) => {
  const subject = 'Welcome to Eyecon';
  const text = `Hi ${user.name || 'there'},\n\nWelcome to Eyecon. Your account has been created successfully.\n\nYou can now browse optical frames, lenses, and sunglasses.\n\nThanks,\nEyecon Team`;
  return sendEmail({
    to: user.email,
    subject,
    text,
    html: `<p>Hi ${user.name || 'there'},</p><p>Welcome to Eyecon. Your account has been created successfully.</p><p>You can now browse optical frames, lenses, and sunglasses.</p><p>Thanks,<br/>Eyecon Team</p>`,
  });
};

const sendOrderStatusEmail = async (order, status, notes = '') => {
  const user = order.userId && typeof order.userId === 'object' && order.userId.email ? order.userId : null;
  const toAddress = user?.email || order.userEmail;
  const userName = user?.name || order.customerName || 'Customer';

  if (!toAddress) {
    return { ok: false, reason: 'missing-recipient' };
  }

  const subject = `${getStatusLabel(status)} - Eyecon Order ${order.trackingId || 'N/A'}`;
  const text = `Hi ${userName},\n\nYour Eyecon order ${order.trackingId || 'N/A'} is now ${getStatusLabel(status)}.\n${notes ? `Note: ${notes}` : ''}\n\nThanks,\nEyecon Team`;

  const recipients = [toAddress];
  if (process.env.ADMIN_EMAIL) recipients.push(process.env.ADMIN_EMAIL);

  const results = [];
  for (const recipient of recipients) {
    results.push(sendEmail({
      to: recipient,
      subject,
      text,
      html: `<p>Hi ${userName},</p><p>Your Eyecon order <strong>${order.trackingId || 'N/A'}</strong> is now <strong>${getStatusLabel(status)}</strong>.</p>${notes ? `<p>${notes}</p>` : ''}<p>Thanks,<br/>Eyecon Team</p>`,
    }));
  }

  return Promise.all(results);
};

const sendPasswordResetEmail = async (user, resetUrl) => {
  const subject = 'Reset your Eyecon password';
  const text = `Hi ${user.name || 'there'},\n\nYou requested a password reset for your Eyecon account.\n\nOpen this link to reset your password:\n${resetUrl}\n\nIf you did not request this, you can ignore this email.\n\nThanks,\nEyecon Team`;
  return sendEmail({
    to: user.email,
    subject,
    text,
    html: `<p>Hi ${user.name || 'there'},</p><p>You requested a password reset for your Eyecon account.</p><p><a href="${resetUrl}">Reset your password</a></p><p>If you did not request this, you can ignore this email.</p><p>Thanks,<br/>Eyecon Team</p>`,
  });
};

module.exports = {
  sendEmail,
  sendAccountWelcomeEmail,
  sendOrderStatusEmail,
  sendPasswordResetEmail,
  generateTrackingId,
  getMailerStatus,
};
