const TelegramBot = require("node-telegram-bot-api");
const { promises } = require("fs");
const api = require("express");
const TOKEN = "8073312360:AAFMOQn875MoAuwbI-q0fhs76WeD2n2ErgM";

const server = api();

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  const userId = msg.chat.id;
  const userCode = msg.text;

  if (msg.text === "/start") {
    bot.sendMessage(
      userId,
      "<b>👋 Salom basharenga ski, men kino topar botman. Kinoni topish uchun uning kodini kiriting ...</b>",
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
        .readFile("./baza.json", "utf-8")
        .then((res) => JSON.parse(res))
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

// Default endpoint to handle requests
server.all("*", (req, res) => {
  res.send("Bot server ishlamoqda. Bot Telegram orqali javob beradi.");
});

// Exporting the handler for Vercel
module.exports = server;
