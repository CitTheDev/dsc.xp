/// <reference types="node" />
import EventEmitter from "node:events";
import { UserManager } from "./Classes/Managers/UserManager.js";
import { GuildManager } from "./Classes/Managers/GuildManager.js";
import { UserOptions } from "./Interfaces/UserOptions.js";
import { UserUpdateOptions } from "./Interfaces/UserUpdate.js";
declare class DiscordXP extends EventEmitter {
    users: UserManager;
    guilds: GuildManager;
    /**
     * Initialize the dsc.xp package
     */
    constructor(url: string);
}
interface DiscordXPEvents {
    newListener: [name: string, listener: (...args: any) => void];
    removeListener: [name: string, listener: (...args: any) => void];
    guildDelete: [guildId: string];
    userCreate: [options: UserOptions];
    userDelete: [options: UserOptions];
    userUpdate: [options: UserUpdateOptions];
    debug: [data: string];
}
interface DiscordXP {
    emit: (<K extends keyof DiscordXPEvents>(event: K, ...args: DiscordXPEvents[K]) => boolean) & (<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, ...args: any[]) => boolean);
    off: (<K extends keyof DiscordXPEvents>(event: K, listener: (...args: DiscordXPEvents[K]) => void) => this) & (<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, listener: (...args: any[]) => void) => this);
    on: (<K extends keyof DiscordXPEvents>(event: K, listener: (...args: DiscordXPEvents[K]) => void) => this) & (<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, listener: (...args: any[]) => void) => this);
    once: (<K extends keyof DiscordXPEvents>(event: K, listener: (...args: DiscordXPEvents[K]) => void) => this) & (<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, listener: (...args: any[]) => void) => this);
    removeAllListeners: (<K extends keyof DiscordXPEvents>(event?: K) => this) & (<S extends string | symbol>(event?: Exclude<S, keyof DiscordXPEvents>) => this);
}
export default DiscordXP;
