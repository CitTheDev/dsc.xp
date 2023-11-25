import { DiscordXP } from "../index.js";
import { ResolvedFetchedUserData, BaseUserFetchData } from "./index.js";

export interface FinalFetchedUserData extends ResolvedFetchedUserData {
    /** The DiscordXP client */
    client: DiscordXP
}

export interface FinalUserFetchData extends BaseUserFetchData {
    /** The DiscordXP client */
    client: DiscordXP;
}