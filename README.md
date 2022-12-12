# twitter-name-tracker

Simple script to check username availability on Twitter using a Nitter instance and notify the user via a Telegram bot.

Environment variables required:
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHANNEL_ID
- DESIRED_USERNAME

The Telegram bot accepts `check` as a command for a manual check. You can retrieve the channel ID by sending a message to your bot while the script is running. The channel ID of the incoming messages is logged in the console.
