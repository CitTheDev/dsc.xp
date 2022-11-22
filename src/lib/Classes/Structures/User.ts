import { UserOptions } from "../../Interfaces/index.js";
import { fetchSchema, validateUserOptions } from "../../Utils/index.js";
import DB from "../../schemas/LevelDB.js";
import { Level, XP } from "../index.js";

export class User {
    private options: UserOptions;
    public level: Level;
    public xp: XP;
    /**
     * Initialise a new user instance
     * @param options - The options for the user
     */
    constructor (options: UserOptions) {
        const validate = validateUserOptions(options);
        if (validate.invalid) throw new TypeError(validate.error);

        this.options = options;
        this.level = new Level(options);
        this.xp = new XP(options);
    }

    /**
     * Delete the user from the database
     */
    delete(): Promise<boolean | null> {
        return new Promise(async (res) => {
            const data = await fetchSchema(this.options);
            if (!data) return res(null);

            await DB.findOneAndDelete({ guildId: this.options.guildId, userId: this.options.userId });
            this.options.client.emit("userDelete", {
                client: this.options.client,
                guildId: this.options.guildId,
                userId: this.options.userId
            });
            return res(true);
        });
    }
}