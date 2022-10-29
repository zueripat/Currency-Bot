const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require('discord.js');
const dbFunctions = require('../handlers/db/functions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removecoins')
    .setDescription('Remove coins from a user!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to remove coins from')
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('The amount of coins to remove')
        .setRequired(true)
    ),
  async execute(interaction) {
    const functions = new dbFunctions();
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');
    const embed = new EmbedBuilder();

    let dbUser = await functions.getUser({ _id: user.id });
    if (dbUser) {
      await functions.updateUser({
        _id: user.id,
        balance: dbUser?.balance
          ? dbUser.balance - amount >= 0
            ? dbUser.balance - amount
            : 0
          : 0,
        name: user.username,
      });
      embed
        .setTitle('Remove Coins')
        .setDescription(
          `${user} now has ${
            dbUser?.balance
              ? dbUser.balance - amount >= 0
                ? dbUser.balance - amount
                : 0
              : 0
          } coins!`
        )
        .setColor('Green')
        .setTimestamp();
    } else {
      embed
        .setTitle('Remove Coins')
        .setDescription(`${user} has no coins!`)
        .setColor('Green')
        .setTimestamp();
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
