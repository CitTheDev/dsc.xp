import DiscordXP from "../../index.js";
import { UserOptions } from "../../Interfaces/UserOptions.js";
import { User } from "../Structures/User.js";
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
