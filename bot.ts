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
  "gio": "gaming4gio bricks pulse bomb and blames heals",
  "Gio": "Gaming4Gio Bricks Pulse Bomb and Blames Heals",
  "GIO": "GAMING4GIO BRICKS PULSE BOMB AND BLAMES HEALS",
  "keith": "I'm watching originals, and eating mcdonalds!",
  "Keith": "I'm Watching Originals, and Eating Mcdonalds!",
  "KEITH": "I'M WATCHING ORIGINALS, AND EATING MCDONALDS!",
  "rohan": "sha kuu terry",
  "Rohan": "Sha Kuu Terry",
  "ROHAN": "SHA KUU TERRY",
  "pih": "poh",
  "Pih": "Poh",
  "PIH": "POH",
  "poh": "piiiiih",
  "Poh": "Piiiiih",
  "POH": "PIIIIIH",
  "sd": "wrong chat rohan...",
  "Sd": "Wrong Chat Rohan...",
  "SD": "WRONG CHAT ROHAN...",
  "esha": "what the heckkkk. no literally. that iss funny. at least i'm consistent. i love chris lake. bro im tired. food coma. i have workk in the morning.",
  "Esha": "What the Heckkkk. No Literally. That iss Funny. At Least I'm Consistent. I Love Chris Lake. Bro I'm Tired. Food Coma. I Have Workk in the Morning.",
  "ESHA": "WHAT THE HECKKKK. NO LITERALLY. THAT ISS FUNNY. AT LEAST I'M CONSISTENT. I LOVE CHRIS LAKE. BRO I'M TIRED. FOOD COMA. I HAVE WORKK IN THE MORNING.",
  "zai": "don't tell me you're watching vampire diaries again. put on slime. yo, hop on terraria. bro, i don't think i can play competitive games anymore.",
  "Zai": "Don't Tell me You're Watching Vampire Diaries Again. Put on Slime. Yo, Hop on Terraria. Bro, I Don't Think I Can Play Competitve Games Anymroe.", 
  "ZAI": "DON'T TELL ME YOU'RE WATCHING VAMPIRE DIARIES AGAIN. PUT ON SLIME. YO, HOP ON TERRARIA. BRO, I DON'T THINK I CAN PLAY COMPETITIVE GAMES ANYMORE."
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
