import { join } from "path";
import { readdirSync } from "fs";
import { Client, GatewayDispatchEvents } from "@discordjs/core";
import { AnyCommand, AnyCommandJson } from "../../types";

export async function registerCommands(client: Client) {
  const commandFiles = readdirSync(join(__dirname, "../commands")).filter(
    (file) => file.endsWith(".ts")
  );
  const commands: Map<string, AnyCommandJson> = new Map();

  for (const file of commandFiles) {
    const command = require(join(__dirname, "../commands", file)) as AnyCommand;
    commands.set(command.default.data.name, command.default.data.toJSON());

    client.on(
      GatewayDispatchEvents.InteractionCreate,
      async ({ data: interaction, api }) => {
        await command.default.execute(interaction, api);
      }
    );
  }

  return commands;
}
