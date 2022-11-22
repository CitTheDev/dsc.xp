const { DiscordXP } = require("../dist/index.js");
const xpClient = new DiscordXP("MongoDB URL");

xpClient
    .on("debug", () => {})
    .on("guildDelete", () => {})
    .on("newListener", () => {})
    .on("removeListener", () => {})
    .on("userCreate", () => {})
    .on("userDelete", () => {})
    .on("userUpdate", () => {});