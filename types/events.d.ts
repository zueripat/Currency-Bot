import { MappedEvents } from "@discordjs/core";

export declare type AnyEvent = {
  default: {
    event: keyof MappedEvents;
    once: boolean;
    execute: (...args: any[]) => Promise<void>;
  };
};
