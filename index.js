const { Client, Partials } = require('discord.js');
const { join } = require('path');
const { readdirSync } = require('fs');
require('dotenv').config();

const {
  Channel,
  GuildMember,
  GuildScheduledEvent,
  User,
  Reaction,
  Message,
  ThreadMember,
} = Partials;

const client = new Client({
  intents: 131071,
  partials: [
    Channel,
    GuildMember,
    GuildScheduledEvent,
    User,
    Reaction,
    Message,
    ThreadMember,
  ],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  rest: { timeout: 1000 },
});

// Export the client
module.exports = client;

// Load all the events
const eventsPath = join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter((file) =>
  file.endsWith('.js')
);

for (const file of eventFiles) {
  const filePath = join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Load all the commands (Slash Commands)
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter((file) =>
  file.endsWith('.js')
);

for (const file of commandFiles) {
  const filePath = join(commandsPath, file);
  const command = require(filePath);
  client.application?.commands.set(command.data.name, command);
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === command.data.name) {
      await command.execute(interaction);
    }
  });
}

if (process.env.DISCORD_TOKEN) {
  client.login(process.env.DISCORD_TOKEN);
} else {
  throw new Error('No token provided');
}
