import { validateUserOptions, validateAmount, fetchUserSchema } from "../../Utils/index.js";
import { FinalFetchedUserData, FinalUserFetchData, TempStorageValue, UserUpdateType } from "../../Interfaces/index.js";
import { User } from "./User.js";

export class Level {
    private options: FinalUserFetchData;
    /**
     * Initialise the level structure of the user
     * @param options - The options for the user
     */
    constructor (options: FinalUserFetchData) {
        this.options = options;

        const validate = validateUserOptions(this.options);
        if (validate.invalid) throw new TypeError(validate.error);
    }

    /**
     * Add a level to a users schema
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
     * Subtract a level from a users schema
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

            // const data = await fetchUserSchema(this.options);
            // if (!data) return res(null);

            // data.level -= amount;
            // await data.save();
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
            if (!data) return res(null);

            // const tempGuild = this.options.client.tempStorage.get(this.options.guildId);
            // if (!data?.users.length && !tempStorage?.length) return res(null);

            // let resolvedData: TempStorageValue[] = [];

            // if (!data?.users.length && tempStorage?.length) resolvedData = tempStorage;
            // if (data?.users.length && !tempStorage?.length) resolvedData = data.users;

            // if (data?.users.length && tempStorage?.length) {
            //     const beforeResolvedData: TempStorageValue[] = [...data.users];

            //     for (const user of tempStorage) {
            //         const userIndex = data.users.findIndex((dbUser) => dbUser.userId === user.userId);

            //         if (userIndex === -1) return;

            //         beforeResolvedData[userIndex].level += user.level;
            //         beforeResolvedData[userIndex].xp += user.xp;
            //     }

            //     resolvedData = beforeResolvedData;
            // }

            // const data = await fetchUserSchema(this.options);
            // if (!data) return res(null);

            return res(data.level);
        });
    }
}