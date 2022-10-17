import { validateUserOptions, validateXP } from "../../Utils/index.js";
import DB from "../../schemas/LevelDB.js";
import { UserOptions } from "../../Interfaces/UserOptions.js";
import { UserUpdate } from "../../Interfaces/UserUpdate.js";

export class Level {
    private options: UserOptions;
    /**
     * Initialise a new level instance
     */
    constructor (options: UserOptions) {
        this.options = options;

        const validate = validateUserOptions(this.options);
        if (validate.invalid) throw new TypeError(validate.error);
    }

    /**
     * Add a level to a users schema
     */
    add(amount: number = 1): Promise<object | null> {
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

            return res(data);
        });
    }

    /**
     * Subtract a level from a users schema
     */
    subtract(amount: number = 1): Promise<object | null> {
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

            return res(data);
        });
    }

    /**
     * Set the level of a user
     */
    set(amount: number = 1): Promise<object | null> {
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

            return res(data);
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