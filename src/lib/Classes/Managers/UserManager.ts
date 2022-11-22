import { DiscordXP } from "../../index.js";
import { UserOptions } from "../../Interfaces/index.js";
import DB from "../../schemas/LevelDB.js";
import { validateUserOptions, schemaExists } from "../../Utils/index.js";
import { User } from "../index.js";

export class UserManager {
    private client: DiscordXP;
    /**
     * Initialise the UserManager class
     * @param client - The DiscordXP client
     */
    constructor (client: DiscordXP) {
        this.client = client;
    }

    /**
     * Create a user and save it to the database
     * @param options - The options needed to create a user
     */
    create(options: UserOptions): Promise<User> {
        return new Promise(async (res, rej) => {
            const validate = validateUserOptions(options);
            if (validate.invalid) return rej(new TypeError(validate.error));

            if (await schemaExists(options) === false) {
                await DB.create({ guildId: options.guildId, userId: options.userId });
                this.client.emit("userCreate", options);
            }

            return res(new User(options));
        });
    }

    /**
     * Delete a user from the database
     * @param options - The options needed to delete a user
     */
    delete(options: UserOptions): Promise<boolean> {
        return new Promise(async (res, rej) => {
            const validate = validateUserOptions(options);
            if (validate.invalid) return rej(new TypeError(validate.error));
            if (await schemaExists(options) === false) return res(false);

            await DB.findOneAndDelete({ guildId: options.guildId, userId: options.userId });
            return res(true);
        });
    }

    /**
     * Fetch a user from the database
     * @param options - The options needed to fetch the user
     */
    fetch(options: UserOptions): Promise<User | null> {
        return new Promise(async (res, rej) => {
            const validate = validateUserOptions(options);
            if (validate.invalid) return rej(new TypeError(validate.error));

            if (await schemaExists(options) === false) return res(null);

            return res(new User(options));
        });
    }
}