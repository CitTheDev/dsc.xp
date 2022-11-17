import { UserOptions } from "./UserOptions.js";

export interface UserUpdateOptions extends UserOptions {
    type: UserUpdate;
}

export enum UserUpdate {
    LevelAdd,
    LevelSubtract,
    LevelSet,
    XPAdd,
    XPSubstract,
    XPSet
}