import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import { registerEvents } from './handlers/events';
import { registerCommands } from './handlers/commands';
import { Client, GatewayIntentBits } from '@discordjs/core';

// Import the Environment Variables
const token = process.env['DISCORD_TOKEN'];
const clientId = process.env['CLIENT_ID'];
const guildId = process.env['GUILD_ID'];

// Check if the Environment Variables are set
if (!token || !clientId || !guildId) {
    throw new Error('Environment Variables are not set.');
}

// Create REST and WebSocket managers directly
const rest = new REST({ version: '10' }).setToken(token);
const { Guilds } = GatewayIntentBits;
const ws = new WebSocketManager({
    token,
    intents: Guilds,
    rest,
});

// Create a client to emit relevant events.
const client = new Client({ rest, ws });

(async () => {
    // Register the events
    await registerEvents(client);

    // Register the commands
    const commands = await registerCommands(client);

    // Register the commands to the server
    await rest.put(`/applications/${clientId}/guilds/${guildId}/commands`, { body: [...commands.values()] });

    // Start the WebSocket connection.
    await ws.connect();
})();

export { client, rest, ws };