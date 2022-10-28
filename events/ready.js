const { Client } = require('discord.js');
const deploy = require('../deploy');
const Log = require('../handlers/Log');
const dbFunctions = require('../handlers/db/functions');

module.exports = {
  name: 'ready',
  once: true,

  /**
   * @param {Client} client
   */

  async execute(client) {
    const { user, ws } = client;
    await deploy();
    await new dbFunctions(client).init();
    Log(`Logged in as ${user?.tag}`, 0, 'Ready');

    setInterval(() => {
      const ping = ws.ping;

      user?.setPresence({
        activities: [
          {
            name: `Ping: ${ping}ms`,
            type: 3,
          },
        ],
      });
    }, 60000);
  },
};
