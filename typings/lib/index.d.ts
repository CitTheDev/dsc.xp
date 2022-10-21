/// <reference types="node" />
import EventEmitter from "node:events";
import { UserManager, GuildManager } from "./Classes/index.js";
import { UserOptions, UserUpdateOptions } from "./Interfaces/index.js";
interface DiscordXPEvents {
    newListener: [name: string, listener: (...args: any) => void];
    removeListener: [name: string, listener: (...args: any) => void];
    guildDelete: [guildId: string];
    userCreate: [options: UserOptions];
    userDelete: [options: UserOptions];
    userUpdate: [options: UserUpdateOptions];
    debug: [data: string];
}
export interface DiscordXP {
    emit: (<K extends keyof DiscordXPEvents>(event: K, ...args: DiscordXPEvents[K]) => boolean) & (<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, ...args: any[]) => boolean);
    off: (<K extends keyof DiscordXPEvents>(event: K, listener: (...args: DiscordXPEvents[K]) => void) => this) & (<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, listener: (...args: any[]) => void) => this);
    on: (<K extends keyof DiscordXPEvents>(event: K, listener: (...args: DiscordXPEvents[K]) => void) => this) & (<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, listener: (...args: any[]) => void) => this);
    once: (<K extends keyof DiscordXPEvents>(event: K, listener: (...args: DiscordXPEvents[K]) => void) => this) & (<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, listener: (...args: any[]) => void) => this);
    removeAllListeners: (<K extends keyof DiscordXPEvents>(event?: K) => this) & (<S extends string | symbol>(event?: Exclude<S, keyof DiscordXPEvents>) => this);
}
export declare class DiscordXP extends EventEmitter {
    users: UserManager;
    guilds: GuildManager;
    /**
     * Initialize the dsc.xp package
     */
    constructor(url: string);
}
export {};
