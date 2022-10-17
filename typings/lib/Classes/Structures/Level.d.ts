import { UserData, UserOptions } from "../../Interfaces/index.js";
export declare class Level {
    private options;
    /**
     * Initialise a new level instance
     */
    constructor(options: UserOptions);
    /**
     * Add a level to a users schema
     */
    add(amount?: number): Promise<UserData | null>;
    /**
     * Subtract a level from a users schema
     */
    subtract(amount?: number): Promise<UserData | null>;
    /**
     * Set the level of a user
     */
    set(amount?: number): Promise<UserData | null>;
    /**
     * Fetch the level of the user
     */
    fetch(): Promise<number | null>;
}
