/* eslint-disable @typescript-eslint/no-explicit-any */
import EventEmitter from "node:events";
import { UserManager, GuildManager, User } from "./Classes/index.js";
import { FinalUserFetchData, TempStorageValue, UserUpdateType } from "./Interfaces/index.js";
import DB from "./schemas/LevelDB.js";

interface DiscordXPEvents {
    newListener: [name: string, listener: (...args: any) => void];
    removeListener: [name: string, listener: (...args: any) => void];
	guildCreate: [guildId: string];
	guildDelete: [guildId: string];
	userCreate: [user: User];
	userDelete: [userData: FinalUserFetchData];
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

export interface DiscordXPOptions {
    /** The time in seconds for how often the data in tempStorage gets updated to the database */
    saveTimeout: number;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class DiscordXP extends EventEmitter {
    public options: DiscordXPOptions;
    /** The User Manager */
    public users: UserManager = new UserManager(this);
    /** The Guild Manager */
    public guilds: GuildManager = new GuildManager(this);
    /** Where everything is stored before the data is pushed to the database. After everything is updated the collection is cleared. */
    public tempStorage: Map<string, TempStorageValue[]> = new Map();
    /**
     * Initialize the dsc.xp package
     * @param options - The data needed for the package to work properly
     */
    constructor (options: DiscordXPOptions) {
        super ();
        this.emit("debug", "DiscordXP constructure initialised");
        this.options = options;

        setTimeout(async () => {
            this.emit("debug", "Database updating started");
            const timeStart = Date.now();

            for (const [guildId, tempUsers] of this.tempStorage) {
                const data = await DB.findOne({ guildId });
                if (!data) return;

                for (const user of tempUsers) {
                    const userIndex = data.users.findIndex((dbUser) => dbUser.userId === user.userId);

                    if (userIndex === -1) {
                        data.users.push(user);
                        return await data.save();
                    }

                    data.users[userIndex].level += user.level;
                    data.users[userIndex].xp += user.xp;

                    await data.save();
                }
            }
            this.tempStorage.clear();
            this.emit("debug", "Temporary storage cleared");

            const timeTaken = Date.now() - timeStart;
            this.emit("debug", `Database updating completed. Time taken: ${timeTaken}`);
        }, this.options.saveTimeout * 1000);
    }
}