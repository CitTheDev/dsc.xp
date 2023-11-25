export interface ResolvedFetchedUserData extends BaseUserFetchData, UserData {}

export interface UserData {
    level: number;
    xp: number;
}

export interface BaseUserFetchData {
    guildId: string;
    userId: string;
}

export interface TempStorageValue {
    userId: string;
    level: number;
    xp: number;
}