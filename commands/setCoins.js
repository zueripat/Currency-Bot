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
    const functions = new dbFunctions();
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');

    let dbUser = await functions.getUser({ _id: user.id });
    if (!dbUser) {
      dbUser = await functions.createUser({
        _id: user.id,
        name: user.username,
      });
    }

    await functions.updateUser({
      _id: user.id,
      balance: amount,
      name: user.username,
    });

    const embed = new EmbedBuilder()
      .setTitle('Set Coins')
      .setDescription(`${user} now has ${amount} coins!`)
      .setColor('#00FF00')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
