import { UserOptions } from "./UserOptions";
export interface UserUpdateOptions extends UserOptions {
    type: UserUpdate;
}
export declare enum UserUpdate {
    LevelAdd = 0,
    LevelSubtract = 1,
    LevelSet = 2,
    XPAdd = 3,
    XPSubstract = 4,
    XPSet = 5
}
