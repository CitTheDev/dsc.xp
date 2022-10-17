import { UserOptions } from "../Interfaces/UserOptions.js";
import { ValidationData } from "../Interfaces/Util.js";
/**
 * Checks to make sure that the correct options have been given
 */
export declare function validateUserOptions(options: UserOptions): ValidationData;
/**
 * Checks if a schema exists
 */
export declare function schemaExists(options: UserOptions): Promise<boolean>;
