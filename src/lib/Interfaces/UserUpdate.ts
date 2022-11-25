import { UserFetchData } from "./Client.js";

export enum UserUpdateType {
    LevelAdd,
    LevelSubtract,
    LevelSet,
    XPAdd,
    XPSubstract,
    XPSet
}

export interface UserUpdateData extends UserFetchData {
    type: UserUpdateType;
}