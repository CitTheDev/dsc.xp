import { validateOptions } from "../../Utils/UserValidation.js";
import DB from "../../schemas/LevelDB.js";
import { UserOptions } from "../../Interfaces/UserOptions.js";
import { validateXP } from "../../Utils/XpValidation.js";

export class XP {
    private options: UserOptions;
    /**
     * Initialise a new XP instance
     */
    constructor (options: UserOptions) {
        this.options = options;

        const validate = validateOptions(this.options);
        if (validate.invalid) throw new TypeError(validate.error);
    }

    /**
     * Add XP to the user
     */
    add(amount: number = 1): Promise<object | null> {
        return new Promise(async (res, rej) => {
            const XPValidation = validateXP(amount);
            if (XPValidation.invalid) return rej(new TypeError(XPValidation.error));

            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            data.xp += amount;
            await data.save();

            return res(data);
        });
    }

    /**
     * Subtract XP from the user
     */
    subtract(amount: number = 1): Promise<object | null> {
        return new Promise(async (res, rej) => {
            const XPValidation = validateXP(amount);
            if (XPValidation.invalid) return rej(new TypeError(XPValidation.error));

            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            data.xp -= amount;
            await data.save();

            return res(data);
        });
    }

    /**
     * Set the XP of the user
     */
    set(amount: number = 1): Promise<object | null> {
        return new Promise(async (res, rej) => {
            const XPValidation = validateXP(amount);
            if (XPValidation.invalid) return rej(new TypeError(XPValidation.error));

            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            data.xp = amount;
            await data.save();

            return res(data);
        });
    }

    /**
     * Fetch the XP of the user
     */
    fetch(): Promise<number | null> {
        return new Promise(async (res) => {
            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            return res(data.xp);
        });
    }
}