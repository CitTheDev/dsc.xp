import { model, Schema } from "mongoose";

export default model("dsc.xp", new Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
}));