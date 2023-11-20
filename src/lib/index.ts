/* eslint-disable @typescript-eslint/no-explicit-any */
import EventEmitter from "node:events";
import { UserManager, GuildManager, User } from "./Classes/index.js";
import { UserFetchData, UserUpdateType } from "./Interfaces/index.js";

interface DiscordXPEvents {
    newListener: [name: string, listener: (...args: any) => void];
    removeListener: [name: string, listener: (...args: any) => void];
	guildDelete: [guildId: string];
	userCreate: [user: User];
	userDelete: [userData: UserFetchData];
	userUpdate: [user: User, type: UserUpdateType];
	debug: [data: string];
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface DiscordXP {
	emit:
        (<K extends keyof DiscordXPEvents>(event: K, ...args: DiscordXPEvents[K]) => boolean) &
		(<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, ...args: any[]) => boolean);

	off:
        (<K extends keyof DiscordXPEvents>(event: K, listener: (...args: DiscordXPEvents[K]) => void) => this) &
		(<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, listener: (...args: any[]) => void) => this);

	on:
        (<K extends keyof DiscordXPEvents>(event: K, listener: (...args: DiscordXPEvents[K]) => void) => this) &
		(<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, listener: (...args: any[]) => void) => this);

	once:
        (<K extends keyof DiscordXPEvents>(event: K, listener: (...args: DiscordXPEvents[K]) => void) => this) &
		(<S extends string | symbol>(event: Exclude<S, keyof DiscordXPEvents>, listener: (...args: any[]) => void) => this);

	removeAllListeners:
        (<K extends keyof DiscordXPEvents>(event?: K) => this) &
		(<S extends string | symbol>(event?: Exclude<S, keyof DiscordXPEvents>) => this);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class DiscordXP extends EventEmitter {
    /** The User Manager */
    public users: UserManager = new UserManager(this);
    /** The Guild Manager */
    public guilds: GuildManager = new GuildManager(this);
    /**
     * Initialize the dsc.xp package
     */
    constructor () {
        super ();
    }
}