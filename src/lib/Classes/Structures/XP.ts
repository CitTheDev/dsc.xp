import { validateUserOptions, validateXP } from "../../Utils/index.js";
import DB from "../../schemas/LevelDB.js";
import { UserData, UserOptions, UserUpdate } from "../../Interfaces/index.js";

export class XP {
    private options: UserOptions;
    /**
     * Initialise a new XP instance
     * @param options - The options for the user
     */
    constructor (options: UserOptions) {
        this.options = options;

        const validate = validateUserOptions(this.options);
        if (validate.invalid) throw new TypeError(validate.error);
    }

    /**
     * Add XP to the user
     * @param amount - The amount of XP to add to the user
     */
    add(amount = 1): Promise<UserData | null> {
        return new Promise(async (res, rej) => {
            const XPValidation = validateXP(amount);
            if (XPValidation.invalid) return rej(new TypeError(XPValidation.error));

            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            data.xp += amount;
            await data.save();
            this.options.client.emit("userUpdate", {
                client: this.options.client,
                guildId: this.options.guildId,
                userId: this.options.userId,
                type: UserUpdate.XPAdd
            });

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp });
        });
    }

    /**
     * Subtract XP from the user
     * @param amount - The amount of XP to subtract from the user
     */
    subtract(amount = 1): Promise<UserData | null> {
        return new Promise(async (res, rej) => {
            const XPValidation = validateXP(amount);
            if (XPValidation.invalid) return rej(new TypeError(XPValidation.error));

            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            data.xp -= amount;
            await data.save();
            this.options.client.emit("userUpdate", {
                client: this.options.client,
                guildId: this.options.guildId,
                userId: this.options.userId,
                type: UserUpdate.XPSubstract
            });

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp });
        });
    }

    /**
     * Set the XP of the user
     * @param amount - The number to set the users XP to
     */
    set(amount = 1): Promise<UserData | null> {
        return new Promise(async (res, rej) => {
            const XPValidation = validateXP(amount);
            if (XPValidation.invalid) return rej(new TypeError(XPValidation.error));

            const data = await DB.findOne({ guildId: this.options.guildId, userId: this.options.userId });
            if (!data) return res(null);

            data.xp = amount;
            await data.save();
            this.options.client.emit("userUpdate", {
                client: this.options.client,
                guildId: this.options.guildId,
                userId: this.options.userId,
                type: UserUpdate.XPSet
            });

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp });
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