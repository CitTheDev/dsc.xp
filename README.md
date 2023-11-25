# dsc.xp
This is a simple and unique package that uses MongoDB and lets you easily set up a levelling system for your discord bot. It includes many in-built features such as creating a user schema to the database and also includes fetching and deleting. Unlike many other packages, this package includes easy to follow properties and methods so that you know where you can find them.

## Note
Node.js version 16.20.1 or higher is required for this package to function as intended

## Features
- 100% Promise-based
- Easy to find properties and methods
- Included type declarations for TypeScript developers

## Examples
Import the necessary packages:
```js
const { DiscordXP } = require("dsc.xp"); // For CommonJS
import { DiscordXP } from "dsc.xp"; // For ESM

const mongoose = require("mongoose"); // For CommonJS
import mongoose from "mongoose"; // For ESM
```

Initialise the dsc.xp package:
```js
await mongoose.connect("MongoDB URL"); // Connect to your MongoDB database
const xpClient = new DiscordXP({ saveTimeout: 300 }); // Create a new dsc.xp instance with the necessary options
```

More examples:
```js
// Create a new user
xpClient.users.create({ guildId: "Guild ID", userId: "User ID" }).then(async (user) => {
    // When a user is created, the default level is 1 and the default XP is 0

    await user.xp.add(10); // Add 10 XP to the user
    await user.xp.subtract(10); // Subtract 10 XP from the user

    await user.levels.add(1); // Increase the users level by 1
    await user.levels.subtract(1); // Decrease the users level by 1
});

// Fetch an existing user from the database
xpClient.users.fetch({ guildId: "Guild ID", userId: "User ID" }).then(async (user) => {
    await user.xp.add(10); // Add 10 XP to the user
    await user.xp.subtract(10); // Subtract 10 XP from the user

    await user.levels.add(1); // Increase the users level by 1
    await user.levels.subtract(1); // Decrease the users level by 1
});

// Delete a user
xpClient.users.delete({ guildId: "Guild ID", userId: "User ID" });
xpClient.users.fetch({ guildId: "Guild ID", userId: "User ID" }).then(async (user) => await user.delete());
xpClient.users.create({ guildId: "Guild ID", userId: "User ID" }).then(async (user) => await user.delete());
```

Guild Property Examples
```js
xpClient.guilds.fetchLeaderboard({ guildId: "Guild ID", limit: 100 });
xpClient.guilds.delete("Guild ID");
```

# Support
If you encounter any problems with this system hop on into my discord and I will gladly try and fix your issue
> Discord: https://discord.gg/RCUcSNTNrT