import {
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
} from "@discordjs/builders";
import {
  API,
  APIInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from "@discordjs/core";

export type AnyCommand = {
  default: {
    data: SlashCommandBuilder | ContextMenuCommandBuilder;
    execute: (interaction: APIInteraction, api: API) => Promise<void>;
  };
};

export declare type AnyCommandJson =
  | RESTPostAPIChatInputApplicationCommandsJSONBody
  | RESTPostAPIContextMenuApplicationCommandsJSONBody;
