const { Collection } = require("@discordjs/collection");

const col = new Collection();
col.set("a", [{ a: "A" }, { b: "B" }]);



console.log(col.get("a"));
col.get("a").splice(0, 1);
console.log(col.get("a"));