import { GatewayDispatchEvents, GatewayReadyDispatchData } from '@discordjs/core';

export default {
  event: GatewayDispatchEvents.Ready,
  once: true,
  execute({ data }: { data: GatewayReadyDispatchData }) {
    const { user } = data;
    console.log(`Logged in with Bot User ${user.username}#${user.discriminator}`);
  },
};