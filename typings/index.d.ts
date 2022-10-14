import { UserManager } from "./Classes/Managers/UserManager.js";
import { GuildManager } from "./Classes/Managers/GuildManager.js";
export default class DiscordXP {
    users: UserManager;
    guilds: GuildManager;
    /**
     * Initialize the dsc.xp package
     */
    constructor(url: string);
}
