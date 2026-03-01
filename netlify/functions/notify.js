exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const name = data.name;
  const email = data.email;
  const message = data.message;

  const text = `
📩 New Website Message

👤 Name: ${name}
📧 Email: ${email}
📝 Message: ${message}
`;

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Notification sent" }),
  };
};
    
