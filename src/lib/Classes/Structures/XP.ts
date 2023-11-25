import { fetchSchema, validateUserOptions, validateAmount } from "../../Utils/index.js";
import { FinalFetchedUserData, FinalUserFetchData, UserUpdateType } from "../../Interfaces/index.js";
import { User } from "./User.js";

export class XP {
    private options: FinalUserFetchData;
    /**
     * Initialise a new XP instance
     * @param options - The options for the user
     */
    constructor (options: FinalUserFetchData) {
        this.options = options;

        const validate = validateUserOptions(this.options);
        if (validate.invalid) throw new TypeError(validate.error);
    }

    /**
     * Add XP to the user
     * @param amount - The amount of XP to add to the user
     */
    add(amount = 1): Promise<FinalFetchedUserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            data.xp += amount;
            await data.save();
            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.XPAdd);

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp, client: this.options.client });
        });
    }

    /**
     * Subtract XP from the user
     * @param amount - The amount of XP to subtract from the user
     */
    subtract(amount = 1): Promise<FinalFetchedUserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            data.xp -= amount;
            await data.save();
            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.XPSubstract);

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp, client: this.options.client });
        });
    }

    /**
     * Set the XP of the user
     * @param amount - The number to set the users XP to
     */
    set(amount: number): Promise<FinalFetchedUserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            data.xp = amount;
            await data.save();
            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.XPSet);

            return res({ guildId: data.guildId, userId: data.userId, level: data.level, xp: data.xp, client: this.options.client });
        });
    }

    /**
     * Fetch the XP of the user
     */
    fetch(): Promise<number | null> {
        return new Promise(async (res) => {
            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            return res(data.xp);
        });
    }
}