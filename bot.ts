import { Client, Events, GatewayIntentBits, Message } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const responses: Record<string, string> = {
  "ping": "pong", 
  "Ping": "Pong",
  "PING": "PONG",
  "pong": "Hey! Only I can say that, but I guess it's fine. ping",
  "Pong": "Hey! Only I can say that, but I guess it's fine. Ping",
  "PONG": "HEY! ONLY I CAN SAY THAT, BUT I GUESS IT'S FINE. PING",
  "pign": "Don't pmo",
  "Pign": "Don't Pmo",
  "PIGN": "DON'T PMO",
  "gio": "gaming4gio bricks pulse bomb and blames heals"
};

client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message: Message) => {
  if (message.author.bot) return;

  const targetChannelId = "1492235384288182363"; 
  if (message.channelId !== targetChannelId) {
    return;
  }
  
  const content = message.content.trim();

  for (const [trigger, reply] of Object.entries(responses)) {
    if (content === trigger || content.includes(trigger)) {
      await (message.channel as any).send({ content: reply });
      return;
    }
  }
});

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
  console.error("DISCORD_BOT_TOKEN is not set");
  process.exit(1);
}

client.login(token);
