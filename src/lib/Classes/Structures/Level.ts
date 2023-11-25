import { validateUserOptions, validateAmount, fetchUserSchema } from "../../Utils/index.js";
import { FinalFetchedUserData, FinalUserFetchData, TempStorageValue, UserUpdateType } from "../../Interfaces/index.js";
import { User } from "./User.js";

export class Level {
    private options: FinalUserFetchData;
    /**
     * Initialise the level structure of the user
     * @param options - The data for the user
     */
    constructor (options: FinalUserFetchData) {
        this.options = options;

        const validate = validateUserOptions(this.options);
        if (validate.invalid) throw new TypeError(validate.error);
    }

    /**
     * Add levels to a user
     * @param amount - The amount of levels to add to the user
     */
    add(amount = 1): Promise<FinalFetchedUserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchUserSchema(this.options);
            if (!data) return res(null);

            const tempGuild = this.options.client.tempStorage.get(this.options.guildId);
            if (!tempGuild) this.options.client.tempStorage.set(this.options.guildId, [{ userId: this.options.userId, level: amount, xp: 0 }]);
            else {
                const tempUserIndex = tempGuild.findIndex((user) => user.userId === data.users[data.index].userId);
                if (tempUserIndex === -1) tempGuild.push({ userId: this.options.userId, level: amount, xp: 0 });
                else {
                    const newTempUserData: TempStorageValue = {
                        userId: this.options.userId,
                        level: tempGuild[tempUserIndex].level + amount,
                        xp: tempGuild[tempUserIndex].xp
                    };

                    tempGuild.splice(tempUserIndex, 1);
                    tempGuild.push(newTempUserData);
                }
            }

            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.LevelAdd);

            return res({ guildId: data.guildId, userId: data.users[data.index].userId, level: data.users[data.index].level, xp: data.users[data.index].xp, client: this.options.client });
        });
    }

    /**
     * Subtract levels from a user
     * @param amount - The amount of levels to subtract from the user
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
                    const lvl = tempGuild[tempUserIndex].level;
                    const newTempUserData: TempStorageValue = {
                        userId: this.options.userId,
                        level: (lvl - amount) < 1 ? 1 : lvl - amount,
                        xp: tempGuild[tempUserIndex].xp
                    };

                    tempGuild.splice(tempUserIndex, 1);
                    tempGuild.push(newTempUserData);
                }
            }

            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.LevelSubtract);

            return res({ guildId: data.guildId, userId: data.users[data.index].userId, level: data.users[data.index].level, xp: data.users[data.index].xp, client: this.options.client });
        });
    }

    /**
     * Set the level of a user
     * @param amount - The number to set the users level to
     */
    set(amount: number): Promise<FinalFetchedUserData | null> {
        return new Promise(async (res, rej) => {
            const validation = validateAmount(amount);
            if (validation.invalid) return rej(new TypeError(validation.error));

            const data = await fetchUserSchema(this.options);
            if (!data) return res(null);

            const tempGuild = this.options.client.tempStorage.get(this.options.guildId);
            if (!tempGuild) this.options.client.tempStorage.set(this.options.guildId, [{ userId: this.options.userId, level: amount, xp: 0 }]);
            else {
                const tempUserIndex = tempGuild.findIndex((user) => user.userId === data.users[data.index].userId);
                if (tempUserIndex === -1) tempGuild.push({ userId: this.options.userId, level: amount, xp: 0 });
                else {
                    const newTempUserData: TempStorageValue = {
                        userId: this.options.userId,
                        level: amount,
                        xp: tempGuild[tempUserIndex].xp
                    };

                    tempGuild.splice(tempUserIndex, 1);
                    tempGuild.push(newTempUserData);
                }
            }

            this.options.client.emit("userUpdate", new User(this.options), UserUpdateType.LevelSet);

            return res({ guildId: data.guildId, userId: data.users[data.index].userId, level: data.users[data.index].level, xp: data.users[data.index].xp, client: this.options.client });
        });
    }

    /**
     * Fetch the level of the user
     */
    fetch(): Promise<number | null> {
        return new Promise(async (res) => {
            const data = await fetchUserSchema(this.options);
            const tempGuild = this.options.client.tempStorage.get(this.options.guildId);
            const tempUser = tempGuild?.find((user) => user.userId === this.options.userId);

            if (!data && !tempUser) return res(null);

            let resolvedLevel: number = 1;

            if (!data && tempUser) resolvedLevel = tempUser.level;
            if (data && !tempUser) resolvedLevel = data.users[data.index].level;
            if (data && tempUser) resolvedLevel = data.users[data.index].level + tempUser.level;

            return res(resolvedLevel);
        });
    }
}