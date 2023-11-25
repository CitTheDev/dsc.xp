const { DiscordXP } = require("../dist/index.js");

const client = new DiscordXP({ saveTimeout: 300 });
client.on("debug", console.log);