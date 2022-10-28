const { join } = require('path');
const { readdirSync } = require('fs');
const { REST, Routes, Collection } = require('discord.js');
const Log = require('./handlers/Log');
require('dotenv').config();

// Load all the commands (Slash Commands)
const rest = new REST({ version: '10' }).setToken(
  `${process.env.DISCORD_TOKEN}`
);

module.exports = async function registerApplicationCommands() {
  const commands = new Collection();
  const commandsPath = join(__dirname, 'commands');
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith('.js')
  );

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);
    commands.set(command.data.name, command);
  }
  try {
    Log('Started refreshing application (/) commands.', 0, 'Load Commands');

    if (process.env.GUILD_ID) {
      await rest.put(
        Routes.applicationGuildCommands(
          `${process.env.CLIENT_ID}`,
          `${process.env.GUILD_ID}`
        ),
        { body: commands.map((command) => command.data.toJSON()) }
      );
    } else {
      await rest.put(Routes.applicationCommands(`${process.env.CLIENT_ID}`), {
        body: commands.map((command) => command.data.toJSON()),
      });
    }

    Log('Successfully reloaded application (/) commands.', 0, 'Load Commands');
  } catch (error) {
    console.error(error);
  }
};
