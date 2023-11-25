import { DiscordXP } from "../../index.js";
import { BaseUserFetchData } from "../../Interfaces/index.js";
import { validateUserOptions, fetchUserSchema } from "../../Utils/index.js";
import { User } from "../index.js";

export class UserManager {
    private client: DiscordXP;
    /**
     * The UserManager class
     * @param client - The DiscordXP client
     */
    constructor (client: DiscordXP) {
        this.client = client;
        this.client.emit("debug", "UserManager class created");
    }

    /**
     * Create a user
     * @param options - The data needed to create a user
     */
    create(options: BaseUserFetchData): Promise<User> {
        return new Promise(async (res, rej) => {
            const validate = validateUserOptions({ ...options, client: this.client });
            if (validate.invalid) return rej(new TypeError(validate.error));
            const user = new User({ ...options, client: this.client });

            const tempGuild = this.client.tempStorage.get(options.guildId);
            if (!tempGuild) this.client.tempStorage.set(options.guildId, [{ userId: options.userId, level: 1, xp: 0 }]);
            else tempGuild.push({ userId: options.userId, level: 1, xp: 0 });

            return res(user);
        });
    }

    /**
     * Fetch a user
     * @param options - The data needed to fetch the user
     */
    fetch(options: BaseUserFetchData): Promise<User | null> {
        return new Promise(async (res, rej) => {
            const validate = validateUserOptions({ ...options, client: this.client });
            if (validate.invalid) return rej(new TypeError(validate.error));
            const data = await fetchUserSchema({ ...options });

            if (!data) return res(null);

            return res(new User({ ...options, client: this.client }));
        });
    }
}