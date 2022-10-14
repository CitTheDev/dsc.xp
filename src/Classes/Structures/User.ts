import { UserOptions } from "../../Interfaces/UserOptions.js";
import { schemaExists, validateOptions } from "../../Utils/UserValidation.js";
import DB from "../../schemas/LevelDB.js";
import { Level } from "./Level.js";
import { XP } from "./XP.js";

export class User {
    private options: UserOptions;
    public level: Level;
    public xp: XP;
    /**
     * Initialise a new user instance
     */
    constructor (options: UserOptions) {
        const validate = validateOptions(options);
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
            if (!await schemaExists(this.options)) return res(null);

            await DB.findOneAndDelete({ guildId: this.options.guildId, userId: this.options.userId });
            return res(true);
        });
    }
}