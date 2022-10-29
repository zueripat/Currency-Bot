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
    const functions = new dbFunctions();
    const user = interaction.options.getUser('user');

    let dbUser = await functions.getUser({ _id: user.id });
    if (!dbUser && !user.bot) {
      dbUser = await functions.createUser({
        _id: user.id,
        name: user.username,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle('Get Coins')
      .setDescription(
        `${user} has ${dbUser?.balance ? dbUser.balance : 0} coins!`
      )
      .setColor('Green')
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
