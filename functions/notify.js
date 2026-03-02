export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    const name = data.name;
    const email = data.email;
    const message = data.message;

    const text = `
📩 New Website Message

👤 Name: ${name}
📧 Email: ${email}
📝 Message: ${message}
`;

    const BOT_TOKEN = context.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = context.env.TELEGRAM_CHAT_ID;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
      }),
    });

    return new Response(
      JSON.stringify({ message: "Notification sent" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}
