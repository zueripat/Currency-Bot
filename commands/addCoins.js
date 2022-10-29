const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dbFunctions = require('../handlers/db/functions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addcoins')
    .setDescription('Add coins to a user!')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to add coins to')
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('The amount of coins to add')
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
      balance: dbUser.balance + amount,
      name: user.username,
    });

    const embed = new EmbedBuilder()
      .setTitle('Add Coins')
      .setDescription(
        `${user} now has ${
          dbUser?.balance ? dbUser.balance + amount : amount
        } coins!`
      )
      .setColor('Green')
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
