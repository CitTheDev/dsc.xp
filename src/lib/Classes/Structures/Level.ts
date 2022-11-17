import { validateUserOptions, validateXP } from "../../Utils/index.js";
import DB from "../../schemas/LevelDB.js";
import { UserData, UserOptions, UserUpdate } from "../../Interfaces/index.js";

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
            const XPValidation = validateXP(amount);
            if (XPValidation.invalid) return rej(new TypeError(XPValidation.error));

            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            data.level += amount;
            await data.save();
            this.options.client.emit("userUpdate", {
                client: this.options.client,
                guildId: this.options.guildId,
                userId: this.options.userId,
                type: UserUpdate.LevelAdd
            });

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp });
        });
    }

    /**
     * Subtract a level from a users schema
     * @param amount - The amount of levels to subtract from the user
     */
    subtract(amount = 1): Promise<UserData | null> {
        return new Promise(async (res, rej) => {
            const XPValidation = validateXP(amount);
            if (XPValidation.invalid) return rej(new TypeError(XPValidation.error));

            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            data.level -= amount;
            await data.save();
            this.options.client.emit("userUpdate", {
                client: this.options.client,
                guildId: this.options.guildId,
                userId: this.options.userId,
                type: UserUpdate.LevelSubtract
            });

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp });
        });
    }

    /**
     * Set the level of a user
     * @param amount - The number to set the users level to
     */
    set(amount = 1): Promise<UserData | null> {
        return new Promise(async (res, rej) => {
            const XPValidation = validateXP(amount);
            if (XPValidation.invalid) return rej(new TypeError(XPValidation.error));

            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            data.level = amount;
            await data.save();
            this.options.client.emit("userUpdate", {
                client: this.options.client,
                guildId: this.options.guildId,
                userId: this.options.userId,
                type: UserUpdate.LevelSet
            });

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp });
        });
    }

    /**
     * Fetch the level of the user
     */
    fetch(): Promise<number | null> {
        return new Promise(async (res) => {
            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            return res(data.level);
        });
    }
}