import { SlashCommandBuilder } from "@discordjs/builders";
import { API, APIInteraction, MessageFlags } from "@discordjs/core";
import DBClient from "../handlers/prisma";

const db = new DBClient().instance;

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test the bot"),
  async execute(interaction: APIInteraction, api: API) {
    const user = await db.user.findUnique({
      where: {
        uid: interaction.member?.user.id,
      },
    });

    await api.interactions.reply(interaction.id, interaction.token, {
      content: `Registered user: \`${user?.id ?? "No"}\``,
      flags: MessageFlags.Ephemeral,
    });
  },
};
