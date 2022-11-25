const { DiscordXP } = require("../dist/index.js");
const { DatabaseURL } = require("./config.json");

const client = new DiscordXP(DatabaseURL);
client.on("debug", console.log);