export interface ValidationData {
    invalid: boolean;
    error?: string;
}

export interface GuildLeaderboardData {
    guildId: string;
    limit: number;
}