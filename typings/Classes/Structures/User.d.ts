import { UserOptions } from "../../Interfaces/UserOptions.js";
import { Level } from "./Level.js";
import { XP } from "./XP.js";
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
