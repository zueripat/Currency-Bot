import { join } from "path";
import { readdirSync } from "fs";
import { Client } from "@discordjs/core";
import { AnyEvent } from "../../types";

export async function registerEvents(client: Client) {
  const eventFiles = readdirSync(join(__dirname, "../events")).filter((file) =>
    file.endsWith(".ts")
  );
  for (const file of eventFiles) {
    const event = require(join(__dirname, "../events", file)) as AnyEvent;

    if (event.default.once) {
      client.once(
        event.default.event,
        async (...args) => await event.default.execute(...args)
      );
    } else {
      client.on(
        event.default.event,
        async (...args) => await event.default.execute(...args)
      );
    }
  }
}
