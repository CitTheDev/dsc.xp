import { UserManager } from "./Classes/Managers/UserManager.js";
import mongoose from "mongoose";
import { GuildManager } from "./Classes/Managers/GuildManager.js";

export default class DiscordXP {
    public users: UserManager = new UserManager();
    public guilds: GuildManager = new GuildManager();
    /**
     * Initialize the dsc.xp package
     */
    constructor (url: string) {
        if (!url) throw new TypeError("A MongoDB URL was not provided");
        setTimeout(() => mongoose.connect(url), 1000);
    }
}