import { DiscordXP } from "../../index.js";
export declare class GuildManager {
    private client;
    constructor(client: DiscordXP);
    /**
     * Fetch the leaderboard of a guild
     */
    fetchLeaderboard(options: {
        guildId: string;
        limit: number;
    }): Promise<unknown>;
    /**
     * Delete all entries of a specific guild
     */
    delete(guildId: string): Promise<boolean>;
}
