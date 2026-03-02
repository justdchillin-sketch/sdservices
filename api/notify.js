import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { name, email, message } = req.body || {};

    const text = `
📩 New Website Message

👤 Name: ${name || "-"}
📧 Email: ${email || "-"}
📝 Message: ${message || "-"}
`;

    // ---------- Telegram ----------
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ error: "Missing TELEGRAM env vars on Vercel" });
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      return res.status(500).json({ error: "Telegram API failed", details: errText });
    }

    // ---------- Email (Zoho SMTP) ----------
    const SMTP_USER = process.env.ZOHO_SMTP_USER; // info@stevedevdigital.com
    const SMTP_PASS = process.env.ZOHO_SMTP_PASS; // Zoho password (or app password)
    const TO_EMAIL = process.env.TO_EMAIL || SMTP_USER;

    if (!SMTP_USER || !SMTP_PASS) {
      return res.status(500).json({ error: "Missing ZOHO_SMTP_USER/ZOHO_SMTP_PASS env vars" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"STEVEDEV Website" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: email || undefined,
      subject: `New Website Message — ${name || "Unknown"}`,
      text,
    });

    return res.status(200).json({ message: "Telegram + Email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
  }
