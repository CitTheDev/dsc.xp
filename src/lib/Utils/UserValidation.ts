import { UserOptions, ValidationData } from "../Interfaces/index.js";
import DB from "../schemas/LevelDB.js";

/**
 * Checks to make sure that the correct options have been given
 * @param options - The options needed for the validation
 */
export function validateUserOptions(options: UserOptions): ValidationData {
    if (!options.guildId) return ({ invalid: true, error: "A guild ID was not provided" });
    if (!options.userId) return ({ invalid: true, error: "A user ID was not provided" });
    if (!options.client) return ({ invalid: true, error: "A dsc.xp client class was not provided" });

    return ({ invalid: false });
}

/**
 * Checks if a schema exists
 * @param options - The options needed for the validation
 */
export async function fetchSchema(options: UserOptions) {
    return await DB.findOne({ guildId: options.guildId, userId: options.userId });
}