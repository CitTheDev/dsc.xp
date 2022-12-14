import { fetchSchema, validateUserOptions, validateAmount } from "../../Utils/index.js";
import { FetchedUserData, UserFetchData, UserUpdateType } from "../../Interfaces/index.js";
import { User } from "./User.js";

export class Level {
    private options: UserFetchData;
    /**
     * Initialise the level structure of the user
     * @param options - The options for the user
     */
    constructor (options: UserFetchData) {
        this.options = options;

        const validate = validateUserOptions(this.options);
        if (validate.invalid) throw new TypeError(validate.error);
    }

    /**
     * Add a level to a users schema
     * @param amount - The amount of levels to add to the user
     */
    add(amount = 1): Promise<FetchedUserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            data.level += amount;
            await data.save();
            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.LevelAdd);

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp, client: this.options.client });
        });
    }

    /**
     * Subtract a level from a users schema
     * @param amount - The amount of levels to subtract from the user
     */
    subtract(amount = 1): Promise<FetchedUserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            data.level -= amount;
            await data.save();
            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.LevelSubtract);

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp, client: this.options.client });
        });
    }

    /**
     * Set the level of a user
     * @param amount - The number to set the users level to
     */
    set(amount: number): Promise<FetchedUserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            data.level = amount;
            await data.save();
            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.LevelSet);

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp, client: this.options.client });
        });
    }

    /**
     * Fetch the level of the user
     */
    fetch(): Promise<number | null> {
        return new Promise(async (res) => {
            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            return res(data.level);
        });
    }
}