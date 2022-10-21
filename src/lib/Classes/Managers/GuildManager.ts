import { DiscordXP } from "../../index.js";
import DB from "../../schemas/LevelDB.js";
import { validateGuildOptions } from "../../Utils/index.js";

export class GuildManager {
    private client: DiscordXP;
    constructor (client: DiscordXP) {
        this.client = client;
    }

    /**
     * Fetch the leaderboard of a guild
     */
    fetchLeaderboard(options: { guildId: string, limit: number }) {
        return new Promise(async (res, rej) => {
            const validate = validateGuildOptions(options);
            if (validate.invalid) return rej(new TypeError(validate.error));

            const sorted = (await DB.find({ guildId: options.guildId })).sort((a, b) => b.xp - a.xp).slice(0, options.limit - 1);
            const data = sorted.map((user) => ({ userId: user.userId, level: user.level, xp: user.xp }));
            return res(data);
        });
    }

    /**
     * Delete all entries of a specific guild
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