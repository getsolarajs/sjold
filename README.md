# ✨ Solara.js ✨

[![Documentation](https://img.shields.io/badge/Documentation-Solara.js.org-blue)](https://solara.js.org)

Hey there! Ever wanted to build a Discord bot without pulling your hair out? Meet **Solara.js**!

Think of it like building with blocks, but for code. It's inspired by BDScript and uses the latest discord.js v14, making bot creation **way easier and faster**.

➡️ **Check out our official documentation at [solara.js.org](https://solara.js.org) for guides, examples, and the full function list!**

---

**Heads Up!** 🚧

This project is still growing! While it's quite functional, you might encounter occasional bugs as we continue polishing and improving it.

**Cool Stuff You Can Do:**

*   Write code like `$function[like this]` or just `$function` - super simple!<br>
*   Uses the powerful, up-to-date `discord.js v14`.<br.
*   Handles both old-school `!` commands and new `/` slash commands (`type: "both"`).<br>
*   Easy to add your *own* custom functions.<br>
*   Sending messages and embeds is often automatic (or use `$sendMessage`/`$reply`).<br>
*   Store data short-term (`$let`/`$get`) or long-term (`$setVar`/`$getVar`, `$getUserVar`, etc.).<br>
*   Control flow with conditional logic (`$if`, `$checkCondition`) and error handling (`$onlyForIDs`, `$try`/`$catch`).<br>
*   Comes with **500+** built-in functions for embeds, user/server info, moderation, math, text manipulation, and more! (See docs for the full list!)<br>
*   Setup is streamlined - common Intent/Partial configurations are often handled automatically.<br>

**Get It Running:**

```bash
# Make sure you have Node.js (v16.9 or newer!) installed
npm init -y
npm install @getsolara/solara.js dotenv
```

**Quick Start:**

1.  Make your main bot file (e.g., `bot.js`):

    ```javascript
    // Loads environment variables (like your bot token) from a .env file
    require('dotenv').config();
    const { SolaraClient } = require('@getsolara/solara.js');
    const path = require('path'); // Node.js module for working with file paths

    // Set up the bot client
    const bot = new SolaraClient({
        // Define the events your bot needs to listen to
        intents: [ "Guilds", "GuildMessages", "MessageContent", "GuildMembers" ],
        // Helps receive events for uncached items (e.g., reactions on old messages)
        partials: ["Channel", "Message"],
        // Solara.js specific options
        SolaraOptions: {
            prefix: "!", // Your command prefix (e.g., !help)
            token: process.env.DISCORD_TOKEN // Your secret bot token (loaded from .env)
        }
    });

    // Tell Solara where your command files are located
    const commandsPath = path.join(__dirname, 'commands');
    bot.loadCommands(commandsPath);

    // (Optional) Tell Solara where your custom functions are located
    const functionsPath = path.join(__dirname, 'functions');
    bot.loadFunctions(functionsPath);

    // Event listener: Runs when the bot successfully connects to Discord
    bot.on('ready', () => {
        console.log(`${bot.user.tag} is online and ready to go!`);
    });

    // Log the bot into Discord
    // Note: No need to pass the token here again if it was provided in SolaraOptions
    bot.login();
    ```

2.  Create command files (e.g., `.js` files) in a `commands/` folder:

    **Example: `commands/ping.js`**
    ```javascript
    module.exports = {
        name: "ping", // The main command name
        aliases: ["p"], // Alternative names to trigger the command
        description: "Checks the bot's response time.",
        type: "both", // Allows command to run via prefix AND slash command
        code: `Pong! My latency is $ping ms` // The Solara.js code to execute
    };
    ```

3.  **(Optional) Create custom functions** in a `functions/` folder:

    These are reusable code blocks you can call within your command's `code`.

    **Example: `functions/hello.js`**
    ```javascript
    // ./functions/hello.js
    module.exports = {
        // The name used to call the function (e.g., $hello)
        name: "$hello",
        description: "Returns a simple 'Hello World!' message.",
        // Does this function accept arguments inside brackets like $func[arg]?
        takesBrackets: false, // Set to false as this function needs no arguments
        // The function's logic
        // context: Provides details about the event trigger (message, interaction, etc.)
        // args: Array of arguments passed within brackets (empty if takesBrackets is false)
        execute: async (context, args) => {
            // Simply return the desired string output
            return "Hello World!";
        }
    };
    ```
    You can then use `$hello` in your commands: `code: \`$hello - Welcome to my server!\``

**Need the Full Function List?**

For a complete list of all **500+** built-in functions and detailed explanations of how to use them, head over to our official documentation:

➡️ **[Explore the Functions on solara.js.org](https://solara.js.org)**

**(Previously, you might have looked in `src/functions/`, but the documentation site is now the best resource!)**

**Wanna Help?**

Contributions are welcome! Feel free to open an issue or submit a pull request on GitHub. (Contribution guidelines will be added later).

**License**

MIT License - Feel free to use, modify, and distribute! 👍
