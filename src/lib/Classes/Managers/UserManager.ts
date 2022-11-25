import { DiscordXP } from "../../index.js";
import { BaseUserFetchData } from "../../Interfaces/index.js";
import DB from "../../schemas/LevelDB.js";
import { validateUserOptions, fetchSchema } from "../../Utils/index.js";
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
    create(options: BaseUserFetchData): Promise<User> {
        return new Promise(async (res, rej) => {
            const validate = validateUserOptions({ ...options, client: this.client });
            if (validate.invalid) return rej(new TypeError(validate.error));
            const data = await fetchSchema({ ...options, client: this.client });
            const user = new User({ ...options, client: this.client });

            if (!data) {
                await DB.create({ guildId: options.guildId, userId: options.userId });
                this.client.emit("userCreate", user);
            }

            return res(user);
        });
    }

    /**
     * Delete a user from the database
     * @param options - The options needed to delete a user
     */
    delete(options: BaseUserFetchData): Promise<boolean> {
        return new Promise(async (res, rej) => {
            const validate = validateUserOptions({ ...options, client: this.client });
            if (validate.invalid) return rej(new TypeError(validate.error));
            const data = await fetchSchema({ ...options, client: this.client });

            if (!data) return res(false);

            await DB.findOneAndDelete({ guildId: options.guildId, userId: options.userId });
            this.client.emit("userDelete", {
                client: this.client,
                guildId: options.guildId,
                userId: options.userId
            });
            return res(true);
        });
    }

    /**
     * Fetch a user from the database
     * @param options - The options needed to fetch the user
     */
    fetch(options: BaseUserFetchData): Promise<User | null> {
        return new Promise(async (res, rej) => {
            const validate = validateUserOptions({ ...options, client: this.client });
            if (validate.invalid) return rej(new TypeError(validate.error));
            const data = await fetchSchema({ ...options, client: this.client });

            if (!data) return res(null);

            return res(new User({ ...options, client: this.client }));
        });
    }
}