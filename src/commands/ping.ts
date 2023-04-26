import { SlashCommandBuilder } from '@discordjs/builders';
import { API, APIInteraction, MessageFlags } from '@discordjs/core';

export default {
    data: new SlashCommandBuilder().setName('ping').setDescription('Test the bot'),
    async execute(interaction: APIInteraction, api: API) {
        await api.interactions.reply(interaction.id, interaction.token, {
            content: 'Pong!',
            flags: MessageFlags.Ephemeral,
        });
    },
};