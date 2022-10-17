import { UserOptions } from "../Interfaces/UserOptions.js";
import DB from "../schemas/LevelDB.js";
import { ValidationData } from "../Interfaces/Util";

/**
 * Checks to make sure that the correct options have been given
 */
export function validateUserOptions(options: UserOptions): ValidationData {
    if (!options.guildId) return ({ invalid: true, error: "A guild ID was not provided" });
    if (!options.userId) return ({ invalid: true, error: "A user ID was not provided" });
    if (!options.client) return ({ invalid: true, error: "A dsc.xp client class was not provided" });

    return ({ invalid: false });
}

/**
 * Checks if a schema exists
 */
export async function schemaExists(options: UserOptions): Promise<boolean> {
    const data = await DB.findOne({ guildId: options.guildId, userId: options.userId });
    return data ? true : false;
}