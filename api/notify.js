export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body || {};

    const text = `
📩 New Website Message

👤 Name: ${name || "-"}
📧 Email: ${email || "-"}
📝 Message: ${message || "-"}
`;

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ error: "Missing env vars on Vercel" });
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

    return res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
