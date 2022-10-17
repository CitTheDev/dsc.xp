import { UserData, UserOptions } from "../../Interfaces/index.js";
export declare class XP {
    private options;
    /**
     * Initialise a new XP instance
     */
    constructor(options: UserOptions);
    /**
     * Add XP to the user
     */
    add(amount?: number): Promise<UserData | null>;
    /**
     * Subtract XP from the user
     */
    subtract(amount?: number): Promise<UserData | null>;
    /**
     * Set the XP of the user
     */
    set(amount?: number): Promise<UserData | null>;
    /**
     * Fetch the XP of the user
     */
    fetch(): Promise<number | null>;
}
