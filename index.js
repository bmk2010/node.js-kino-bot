const TelegramBot = require("node-telegram-bot-api");
const { promises } = require("fs");
const TOKEN = "8073312360:AAFMOQn875MoAuwbI-q0fhs76WeD2n2ErgM";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  const userId = msg.chat.id;
  const userCode = msg.text;

  if (msg.text == "/start") {
    bot.sendMessage(
      userId,
      "<b>👋 Salom men kino topar botman. Kinoni topish uchun uning kodini kiriting ...</b>",
      {
        parse_mode: "HTML",
      }
    );
  } else {
    const movieCode = Number(userCode.trim());

    if (isNaN(movieCode)) {
      bot.sendMessage(userId, "😔 Iltimos faqat son kiriting");
    } else {
      promises
        .readFile("./baza.json", "utf-8") // Ensure the file is read as a UTF-8 string
        .then((res) => JSON.parse(res))
        .then((data) => {
          const userCinema = data.find((kino) => kino.code === movieCode); // Use strict equality and return the result

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
