import { ValidationData, GuildLeaderboardData } from "../Interfaces/index.js";

/**
 * Checks to make sure that the correct options have been given
 * @param options - The options needed for the validation
 */
export function validateGuildLeaderboardOptions(options: GuildLeaderboardData): ValidationData {
    if (!options.guildId) return ({ invalid: true, error: "A guild ID was not provided" });
    if (!options.limit) return ({ invalid: true, error: "A limit for the leaderboard was not provided" });
    if (isNaN(options.limit)) return ({ invalid: true, error: "Limit is not a number" });

    return ({ invalid: false });
}