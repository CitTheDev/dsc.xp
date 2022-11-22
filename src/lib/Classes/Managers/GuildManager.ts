import { DiscordXP } from "../../index.js";
import { UserData, GuildLeaderboardData } from "../../Interfaces/index.js";
import DB from "../../schemas/LevelDB.js";
import { validateGuildLeaderboardOptions } from "../../Utils/index.js";

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
    fetchLeaderboard(options: GuildLeaderboardData): Promise<UserData[]> {
        return new Promise(async (res, rej) => {
            const validate = validateGuildLeaderboardOptions(options);
            if (validate.invalid) return rej(new TypeError(validate.error));

            const unsortedUserArray = await DB.find({ guildId: options.guildId });
            const sorted = unsortedUserArray
                .sort((a, b) => b.xp - a.xp)
                .slice(0, options.limit - 1)
                .map((user) => ({ guildId: user.guildId, userId: user.userId, level: user.level, xp: user.xp }));

            return res(sorted);
        });
    }

    /**
     * Delete all entries of a specific guild
     * @param guildId - The ID of the guild to delete
     */
    delete(guildId: string): Promise<boolean> {
        return new Promise(async (res, rej) => {
            if (!guildId) return rej(new TypeError("A guild ID was not provided"));
            await DB.deleteMany({ guildId });
            this.client.emit("guildDelete", guildId);

            return res(true);
        });
    }
}