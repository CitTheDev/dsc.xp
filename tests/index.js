const { DiscordXP } = require("../dist/index.js");
const { DATABASE_URL } = require("./config.json");

const client = new DiscordXP(DATABASE_URL);
console.log(client);