const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dbFunctions = require('../handlers/db/functions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('getcoins')
    .setDescription('Get coins!')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to get coins from')
        .setRequired(true)
    ),
  async execute(interaction) {
    const functions = new dbFunctions(interaction.client);
    const user = interaction.options.getUser('user');

    let dbUser = await functions.getUser(user.id);
    if (!dbUser) {
      dbUser = await functions.createUser(user.id, user.username);
    }

    const embed = new EmbedBuilder()
      .setTitle('Get Coins')
      .setDescription(`${user} has ${dbUser.balance} coins!`)
      .setColor('#00FF00')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
