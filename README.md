# Discord Coin System Bot

This is a low Level Bot, which supplies a Coin System. If any Issues arise feel free to create a Issue on this Repository

## Discord Setup

1. Create a new application on the [Discord Developer Portal](https://discord.com/developers/applications)
2. Go to the Bot tab and create a new bot
3. Copy the token and client ID and paste them into the `.env` file
4. Open up your Console and navigate to where you have your project folder
5. Run `git clone https://github.com/Zueripat/Currency-Bot.git` to clone the repository
6. Open the folder in your IDE and run `npm install` to install all the dependencies
7. Run `npm run start` to start the bot

## Mongo DB
1. Erstelle einen Account auf [MongoDB](https://cloud.mongodb.com)
2. Create a new Organisation
3. Create a new Project inside this Organisation
4. Inside your Project create a Database and configure your Database and Network Access
![image](https://user-images.githubusercontent.com/66902977/198841495-2e440d54-2362-450a-ac07-87bb741670cf.png)
5. Go to `Connect -> Connect your Application` and Copy the Connection String for `Node.js`
![image](https://user-images.githubusercontent.com/66902977/198841511-79f69ede-9e24-4b9d-af3a-4db7414d1dc2.png)
6. Add the String with your Password to the `.env` File

## `.env` File
- [ ] Discord Token
- [ ] Discord Bot ID (Client ID)
- [ ] MongoDB URI (DB_URI)
- [ ] Server / Guild ID 

