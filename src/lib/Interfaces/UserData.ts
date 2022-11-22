import { DiscordXP } from "../index.js";

export interface UserData {
    guildId: string;
    userId: string;
    level: number;
    xp: number;
}

export interface UserEventData extends UserData {
    client: DiscordXP
}