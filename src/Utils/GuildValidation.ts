/**
 * Checks to make sure that the correct options have been given
 */
export function validateOptions(options: { guildId: string, limit: number }): { invalid: boolean, error?: string } {
    if (!options.guildId) return ({ invalid: true, error: "A guild ID was not provided" });
    if (!options.limit) return ({ invalid: true, error: "A limit for the leaderboard was not provided" });

    return ({ invalid: false });
}