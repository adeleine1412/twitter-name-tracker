const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const cheerio = require('cheerio');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});
const desiredUsername = process.env.DESIRED_USERNAME;
const channelId = process.env.TELEGRAM_CHANNEL_ID;
let announceUnavailable = false;

bot.on('message', function(message) {
  console.log(message);

  if (message.text != 'check') return;
  announceUnavailable = true;
  checkUsername();
});

const options = {
  url: `https://nitter.net/${desiredUsername}`,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
  }
};

function checkUsername() {
  request(options, function(error, response, html) {
    if (error) {
      bot.sendMessage(channelId, `Error checking availability of username ${desiredUsername}: ${error}`);
    } else {
      const $ = cheerio.load(html);
  
      if ($('span').text().includes(`User "${desiredUsername}" not found`)) {
        bot.sendMessage(channelId, `Username ${desiredUsername} is now available.`);
      } else {
        console.log(`Username ${desiredUsername} is not available.`);

        if (!announceUnavailable) return;
        announceUnavailable = false;
        bot.sendMessage(channelId, `Username ${desiredUsername} is not available.`);
      }
    }
  });
}

setInterval(function() { checkUsername() }, 300000);
checkUsername();
