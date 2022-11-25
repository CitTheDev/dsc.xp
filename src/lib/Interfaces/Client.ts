import { DiscordXP } from "../index.js";
import { BaseFetchedUserData } from "./UserData.js";
import { BaseUserFetchData } from "./UserOptions.js";

export interface FetchedUserData extends BaseFetchedUserData {
    client: DiscordXP
}

export interface UserFetchData extends BaseUserFetchData {
    client: DiscordXP;
}