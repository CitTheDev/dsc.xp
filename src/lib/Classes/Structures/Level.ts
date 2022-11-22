import { fetchSchema, validateUserOptions, validateAmount } from "../../Utils/index.js";
import { UserData, UserOptions, UserUpdate } from "../../Interfaces/index.js";
import { User } from "./User.js";

export class Level {
    private options: UserOptions;
    /**
     * Initialise the level structure of the user
     * @param options - The options for the user
     */
    constructor (options: UserOptions) {
        this.options = options;

        const validate = validateUserOptions(this.options);
        if (validate.invalid) throw new TypeError(validate.error);
    }

    /**
     * Add a level to a users schema
     * @param amount - The amount of levels to add to the user
     */
    add(amount = 1): Promise<UserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            data.level += amount;
            await data.save();
            this.options.client.emit("userUpdate", new User(this.options), UserUpdate.LevelAdd);

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp });
        });
    }

    /**
     * Subtract a level from a users schema
     * @param amount - The amount of levels to subtract from the user
     */
    subtract(amount = 1): Promise<UserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            data.level -= amount;
            await data.save();
            this.options.client.emit("userUpdate", new User(this.options), UserUpdate.LevelSubtract);

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp });
        });
    }

    /**
     * Set the level of a user
     * @param amount - The number to set the users level to
     */
    set(amount: number): Promise<UserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            data.level = amount;
            await data.save();
            this.options.client.emit("userUpdate", new User(this.options), UserUpdate.LevelSet);

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp });
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