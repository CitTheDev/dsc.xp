const { DiscordXP } = require("../dist/index.js");
const { DatabaseURL } = require("./config.json");

const client = new DiscordXP(DatabaseURL);
// TODO: Test before publishing to npm
// Make dev tag on npm package