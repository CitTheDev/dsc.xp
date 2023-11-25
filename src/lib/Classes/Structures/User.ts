import { FinalUserFetchData } from "../../Interfaces/index.js";
import { fetchUserSchema, validateUserOptions } from "../../Utils/index.js";
import DB from "../../schemas/LevelDB.js";
import { Level, XP } from "../index.js";
import { DiscordXP } from "../../index.js";

export class User {
    public client: DiscordXP;
    public guildId: string;
    public userId: string;
    public level: Level;
    public xp: XP;
    /**
     * Initialise a new user instance
     * @param options - The options for the user
     */
    constructor (options: FinalUserFetchData) {
        const validate = validateUserOptions(options);
        if (validate.invalid) throw new TypeError(validate.error);

        this.client = options.client;
        this.guildId = options.guildId;
        this.userId = options.userId;
        this.level = new Level(options);
        this.xp = new XP(options);
    }

    /**
     * Delete the user from the database
     */
    delete(): Promise<boolean | null> {
        return new Promise(async (res) => {
            const data = await fetchUserSchema({ guildId: this.guildId, userId: this.userId });
            if (!data) return res(null);

            await DB.findOneAndDelete({ guildId: this.guildId, userId: this.userId });
            this.client.emit("userDelete", {
                client: this.client,
                guildId: this.guildId,
                userId: this.userId
            });
            return res(true);
        });
    }
}