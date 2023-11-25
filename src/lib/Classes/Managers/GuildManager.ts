import { DiscordXP } from "../../index.js";
import { GuildLeaderboardData, TempStorageValue } from "../../Interfaces/index.js";
import DB from "../../schemas/LevelDB.js";
import { fetchSchema, validateGuildLeaderboardOptions } from "../../Utils/index.js";

export class GuildManager {
    private client: DiscordXP;
    /**
     * Initialise the GuildManager class
     * @param client - The DiscordXP client
     */
    constructor (client: DiscordXP) {
        this.client = client;
    }

    /**
     * Fetch the leaderboard of a guild
     * @param options - The options needed to fetch the leaderboard
     */
    fetchLeaderboard(options: GuildLeaderboardData): Promise<TempStorageValue[] | null> {
        return new Promise(async (res, rej) => {
            const validate = validateGuildLeaderboardOptions(options);
            if (validate.invalid) return rej(new TypeError(validate.error));

            const data = await fetchSchema(options.guildId);
            const tempStorage = this.client.tempStorage.get(options.guildId);
            if (!data?.users.length && !tempStorage?.length) return res(null);

            let resolvedData: TempStorageValue[] = [];

            if (!data?.users.length && tempStorage?.length) resolvedData = tempStorage;
            if (data?.users.length && !tempStorage?.length) resolvedData = data.users;

            if (data?.users.length && tempStorage?.length) {
                const beforeResolvedData: TempStorageValue[] = [...data.users];

                for (const user of tempStorage) {
                    const userIndex = data.users.findIndex((dbUser) => dbUser.userId === user.userId);

                    if (userIndex === -1) return;

                    beforeResolvedData[userIndex].level += user.level;
                    beforeResolvedData[userIndex].xp += user.xp;
                }

                resolvedData = beforeResolvedData;
            }

            const sorted = resolvedData
                .sort((a, b) => b.xp - a.xp)
                .slice(0, options.limit - 1)
                .map((user) => ({ userId: user.userId, level: user.level, xp: user.xp }));

            return res(sorted);
        });
    }

    /**
     * Create a new guild
     * @param guildId - The ID of the guild to create
     */
    create(guildId: string): Promise<boolean> {
        return new Promise(async (res, rej) => {
            if (!guildId) return rej(new TypeError("A guild ID was not provided"));
            await DB.create({ guildId, users: [] });
            this.client.emit("guildCreate", guildId);

            return res(true);
        });
    }

    /**
     * Delete all entries of a specific guild
     * @param guildId - The ID of the guild to delete
     */
    delete(guildId: string): Promise<boolean> {
        return new Promise(async (res, rej) => {
            if (!guildId) return rej(new TypeError("A guild ID was not provided"));
            await DB.deleteOne({ guildId });
            this.client.emit("guildDelete", guildId);

            return res(true);
        });
    }
}