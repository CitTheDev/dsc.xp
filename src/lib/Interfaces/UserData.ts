export interface ResolvedFetchedUserData extends BaseUserFetchData, UserData {}

export interface UserData {
    /** The level of the user */
    level: number;
    /** The XP of the user */
    xp: number;
}

export interface BaseUserFetchData {
    /** The guild ID that the user is linked to */
    guildId: string;
    /** The ID of the user */
    userId: string;
}

export interface TempStorageValue extends UserData {
    /** The ID of the user */
    userId: string;
}