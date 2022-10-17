import { UserOptions } from "./UserOptions";

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