import { validateUserOptions, validateAmount, fetchUserSchema } from "../../Utils/index.js";
import { FinalFetchedUserData, FinalUserFetchData, TempStorageValue, UserUpdateType } from "../../Interfaces/index.js";
import { User } from "./User.js";

export class XP {
    private options: FinalUserFetchData;
    /**
     * Initialise the XP structure of the user
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

            const data = await fetchUserSchema(this.options);
            if (!data) return res(null);

            const tempGuild = this.options.client.tempStorage.get(this.options.guildId);
            if (!tempGuild) this.options.client.tempStorage.set(this.options.guildId, [{ userId: this.options.userId, level: 1, xp: amount }]);
            else {
                const tempUserIndex = tempGuild.findIndex((user) => user.userId === data.users[data.index].userId);
                if (tempUserIndex === -1) tempGuild.push({ userId: this.options.userId, level: 1, xp: amount });
                else {
                    const newTempUserData: TempStorageValue = {
                        userId: this.options.userId,
                        level: tempGuild[tempUserIndex].level,
                        xp: tempGuild[tempUserIndex].xp + amount
                    };

                    tempGuild.splice(tempUserIndex, 1);
                    tempGuild.push(newTempUserData);
                }
            }

            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.XPAdd);

            return res({ guildId: data.guildId, userId: data.users[data.index].userId, level: data.users[data.index].level, xp: data.users[data.index].xp, client: this.options.client });
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

            const data = await fetchUserSchema(this.options);
            if (!data) return res(null);

            const tempGuild = this.options.client.tempStorage.get(this.options.guildId);
            if (!tempGuild) this.options.client.tempStorage.set(this.options.guildId, [{ userId: this.options.userId, level: 1, xp: 0 }]);
            else {
                const tempUserIndex = tempGuild.findIndex((user) => user.userId === data.users[data.index].userId);
                if (tempUserIndex === -1) tempGuild.push({ userId: this.options.userId, level: 1, xp: 0 });
                else {
                    const xp = tempGuild[tempUserIndex].xp;
                    const newTempUserData: TempStorageValue = {
                        userId: this.options.userId,
                        level: (xp - amount) < 0 ? 0 : xp - amount,
                        xp: tempGuild[tempUserIndex].xp
                    };

                    tempGuild.splice(tempUserIndex, 1);
                    tempGuild.push(newTempUserData);
                }
            }

            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.XPSubstract);

            return res({ guildId: data.guildId, userId: data.users[data.index].userId, level: data.users[data.index].level, xp: data.users[data.index].xp, client: this.options.client });
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

            const data = await fetchUserSchema(this.options);
            if (!data) return res(null);

            const tempGuild = this.options.client.tempStorage.get(this.options.guildId);
            if (!tempGuild) this.options.client.tempStorage.set(this.options.guildId, [{ userId: this.options.userId, level: 1, xp: amount }]);
            else {
                const tempUserIndex = tempGuild.findIndex((user) => user.userId === data.users[data.index].userId);
                if (tempUserIndex === -1) tempGuild.push({ userId: this.options.userId, level: 1, xp: amount });
                else {
                    const newTempUserData: TempStorageValue = {
                        userId: this.options.userId,
                        level: tempGuild[tempUserIndex].level,
                        xp: amount
                    };

                    tempGuild.splice(tempUserIndex, 1);
                    tempGuild.push(newTempUserData);
                }
            }

            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.XPSet);

            return res({ guildId: data.guildId, userId: data.users[data.index].userId, level: data.users[data.index].level, xp: data.users[data.index].xp, client: this.options.client });
        });
    }

    /**
     * Fetch the XP of the user
     */
    fetch(): Promise<number | null> {
        return new Promise(async (res) => {
            const data = await fetchUserSchema(this.options);
            const tempGuild = this.options.client.tempStorage.get(this.options.guildId);
            const tempUser = tempGuild?.find((user) => user.userId === this.options.userId);

            if (!data && !tempUser) return res(null);

            let resolvedXp: number = 0;

            if (!data && tempUser) resolvedXp = tempUser.xp;
            if (data && !tempUser) resolvedXp = data.users[data.index].xp;
            if (data && tempUser) resolvedXp = data.users[data.index].xp + tempUser.xp;

            return res(resolvedXp);
        });
    }
}