import { FinalUserFetchData, BaseUserFetchData, ValidationData } from "../Interfaces/index.js";
import DB from "../schemas/LevelDB.js";

/**
 * Checks to make sure that the correct options have been given
 * @param options - The options needed for the validation
 */
export function validateUserOptions(options: FinalUserFetchData): ValidationData {
    if (!options.guildId) return ({ invalid: true, error: "A guild ID was not provided" });
    if (!options.userId) return ({ invalid: true, error: "A user ID was not provided" });
    if (!options.client) return ({ invalid: true, error: "A dsc.xp client class was not provided" });

    return ({ invalid: false });
}

/**
 * Checks if a schema exists in the database
 * @param guildId - The options needed for the validation
 */
export async function fetchSchema(guildId: string) {
    return await DB.findOne({ guildId });
}

/**
 * Checks if a user exists in the database
 * @param options - The options needed for the validation
 */
export async function fetchUserSchema(options: BaseUserFetchData) {
    const data = await fetchSchema(options.guildId);
    if (data === null) return null;

    const userIndex = data.users.findIndex((user) => user.userId === options.userId);

    return (userIndex === -1 ? null : { ...data, index: userIndex });
}