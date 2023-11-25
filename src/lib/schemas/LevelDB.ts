import { model, Schema } from "mongoose";

export default model("dsc.xp", new Schema({
    guildId: { type: String, required: true },
    users: {
        type: [{
            userId: { type: String, required: true },
            xp: { type: Number, required: true },
            level: { type: Number, required: true }
        }]
    }
}));