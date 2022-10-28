const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dbFunctions = require('../handlers/db/functions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setcoins')
    .setDescription('Set coins to a user!')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to set coins to')
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('The amount of coins to set')
        .setRequired(true)
    ),
  async execute(interaction) {
    const functions = new dbFunctions(interaction.client);
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');

    let dbUser = await functions.getUser(user.id);
    if (!dbUser) {
      dbUser = await functions.createUser(user.id, user.username);
    }

    await functions.updateUser({
      id: user.id,
      balance: amount,
      username: user.username,
    });

    const embed = new EmbedBuilder()
      .setTitle('Set Coins')
      .setDescription(`${user} now has ${amount} coins!`)
      .setColor('#00FF00')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
