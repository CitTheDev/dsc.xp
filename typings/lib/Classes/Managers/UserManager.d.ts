import { DiscordXP } from "../../index.js";
import { UserOptions } from "../../Interfaces/index.js";
import { User } from "../index.js";
export declare class UserManager {
    private client;
    constructor(client: DiscordXP);
    /**
     * Create a user and save it to the database
     */
    create(options: UserOptions): Promise<User>;
    /**
     * Delete a user from the database
     */
    delete(options: UserOptions): Promise<boolean>;
    /**
     * Fetch a user from the database
     */
    fetch(options: UserOptions): Promise<User>;
}
