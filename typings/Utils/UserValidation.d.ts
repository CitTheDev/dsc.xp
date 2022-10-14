import { UserOptions } from "../Interfaces/UserOptions.js";
/**
 * Checks to make sure that the correct options have been given
 */
export declare function validateOptions(options: UserOptions): {
    invalid: boolean;
    error?: string;
};
/**
 * Checks if a schema exists
 */
export declare function schemaExists(options: UserOptions): Promise<boolean>;
