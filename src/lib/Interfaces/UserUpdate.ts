import { FinalUserFetchData } from "./index.js";

export enum UserUpdateType {
    LevelAdd,
    LevelSubtract,
    LevelSet,
    XPAdd,
    XPSubstract,
    XPSet
}

export interface UserUpdateData extends FinalUserFetchData {
    type: UserUpdateType;
}