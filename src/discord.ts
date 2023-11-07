const webhookUrl = process.env.DISCORD_WEBHOOK_URL!!;

/**
 * Send a message to Discord.
 *
 * @param message The message to send to Discord.
 */
export async function sendMessage(message: string) {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: message,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }
}
