require("dotenv").config();
const { Telegraf } = require("telegraf");

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("❌ BOT_TOKEN not found. Check your .env file.");
  process.exit(1);
}

const bot = new Telegraf(token);

// ====== Topic Thread IDs ======
const TOPIC_EN = 2; // English topic
const TOPIC_CN = 7; // Chinese topic

// ====== /ping ======
bot.command("ping", (ctx) => ctx.reply("✅ CCFB Bot Online"));

// ====== Welcome ======
bot.on("new_chat_members", async (ctx) => {
  const chatId = ctx.chat.id;
  const names = ctx.message.new_chat_members.map((u) => u.first_name).join(", ");

  const enMsg =
`👋 Welcome ${names} to CarbonFi (CCFB)

⚖️ Community Principles:
— No advertising
— No DM solicitation
— No spamming
— Respect the order

Rules are active.
Welcome to CarbonFi · CCFB.

Let’s build the future together 🚀`;

  const cnMsg =
`👋 欢迎 ${names} 加入 CarbonFi（CCFB）

⚖️ 群内原则：
— 禁止广告
— 禁止私聊引流
— 禁止刷屏
— 尊重秩序

规则已运行。
欢迎加入 CarbonFi · CCFB。

让我们一起构建未来 🚀`;

  try {
    await ctx.telegram.sendMessage(chatId, enMsg, { message_thread_id: TOPIC_EN });
    await ctx.telegram.sendMessage(chatId, cnMsg, { message_thread_id: TOPIC_CN });
  } catch (err) {
    console.log("❌ Failed to send welcome messages:", err?.message || err);
  }
});

bot.launch();
console.log("✅ Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));