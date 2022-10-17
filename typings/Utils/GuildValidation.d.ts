import { ValidationData } from "../Interfaces/Util.js";
/**
 * Checks to make sure that the correct options have been given
 */
export declare function validateGuildOptions(options: {
    guildId: string;
    limit: number;
}): ValidationData;
