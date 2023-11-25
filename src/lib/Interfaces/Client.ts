import { DiscordXP } from "../index.js";
import { ResolvedFetchedUserData, BaseUserFetchData } from "./index.js";

export interface FinalFetchedUserData extends ResolvedFetchedUserData {
    client: DiscordXP
}

export interface FinalUserFetchData extends BaseUserFetchData {
    client: DiscordXP;
}