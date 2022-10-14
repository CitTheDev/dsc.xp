import { UserOptions } from "../../Interfaces/UserOptions.js";
export declare class Level {
    private options;
    /**
     * Initialise a new level instance
     */
    constructor(options: UserOptions);
    /**
     * Add a level to a users schema
     */
    add(amount?: number): Promise<object | null>;
    /**
     * Subtract a level from a users schema
     */
    subtract(amount?: number): Promise<object | null>;
    /**
     * Set the level of a user
     */
    set(amount?: number): Promise<object | null>;
    /**
     * Fetch the level of the user
     */
    fetch(): Promise<number | null>;
}
