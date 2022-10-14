export declare class GuildManager {
    constructor();
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
