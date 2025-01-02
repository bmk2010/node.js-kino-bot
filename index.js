const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "8073312360:AAFMOQn875MoAuwbI-q0fhs76WeD2n2ErgM"; // Tokenni yangilangan token bilan almashtiring
const URL = "https://your-vercel-deployment-url.vercel.app"; // Vercel URL (har qanday Vercel URL manzilingizga almashtiring)

const bot = new TelegramBot(TOKEN);

// Webhookni o'rnatish
bot.setWebHook(`${URL}/webhook`);

bot.on("message", (msg) => {
  const userId = msg.chat.id;
  const userCode = msg.text;

  if (msg.text === "/start") {
    bot.sendMessage(
      userId,
      "<b>👋 Salom men kino topar botman. Kinoni topish uchun uning kodini kiriting ...</b>",
      { parse_mode: "HTML" }
    );
  } else {
    const movieCode = Number(userCode.trim());

    if (isNaN(movieCode)) {
      bot.sendMessage(userId, "😔 Iltimos faqat son kiriting");
    } else {
      fetch("https://brevdsbbsdjhbjdsvbjhsdvbjhdsvbjhbdvsjhbjhvdsh.vercel.app/baza.json")
        .then((res) => res.json())
        .then((data) => {
          const userCinema = data.find((kino) => kino.code === movieCode);

          if (userCinema) {
            bot.sendMessage(
              userId,
              `🎥 Kino topildi\n\n📛Nomi: ${userCinema.name}\n👀Ko'rish: ${userCinema.url}\n\n🧑‍💻Dasturchi: @hi_bmk`
            );
          } else {
            bot.sendMessage(userId, "😔 Kino topilmadi");
          }
        })
        .catch((error) => {
          console.error("Error reading or processing the file:", error);
          bot.sendMessage(
            userId,
            "😔 Xatolik yuz berdi. Keyinroq qayta urinib ko'ring."
          );
        });
    }
  }
});
