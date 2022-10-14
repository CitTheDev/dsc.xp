import { UserOptions } from "../../Interfaces/UserOptions.js";
export declare class XP {
    private options;
    /**
     * Initialise a new XP instance
     */
    constructor(options: UserOptions);
    /**
     * Add XP to the user
     */
    add(amount?: number): Promise<object | null>;
    /**
     * Subtract XP from the user
     */
    subtract(amount?: number): Promise<object | null>;
    /**
     * Set the XP of the user
     */
    set(amount?: number): Promise<object | null>;
    /**
     * Fetch the XP of the user
     */
    fetch(): Promise<number | null>;
}
