import { UserOptions } from "../../Interfaces/index.js";
import { Level, XP } from "../index.js";
export declare class User {
    private options;
    level: Level;
    xp: XP;
    /**
     * Initialise a new user instance
     */
    constructor(options: UserOptions);
    /**
     * Delete the user from the database
     */
    delete(): Promise<boolean | null>;
}
