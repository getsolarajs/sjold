const { spawn } = require('child_process');

module.exports = {
    name: "$restart",
    description: "Attempts to restart the bot process by spawning a new instance. [DANGEROUS - USE WITH CAUTION]",
    takesBrackets: false,
    execute: async (context, args) => {

        console.warn(`!!! BOT RESTART INITIATED VIA $restart (User: ${context.user?.tag ?? 'Unknown'}) !!!`);

        try {
            if (context.reply) {
                await context.reply("Attempting to restart the bot... The bot will disconnect and should reconnect shortly if successful.");
            } else if (context.channel && context.channel.send) {
               await context.channel.send("Attempting to restart the bot... The bot will disconnect and should reconnect shortly if successful.");
            }

            if (context.client && typeof context.client.destroy === 'function') {
                console.log("Destroying client connection...");
                await context.client.destroy();
                console.log("Client destroyed.");
            } else {
                console.warn("Could not find or call client.destroy(). Proceeding without explicit client destruction.");
            }

            console.log(`Spawning new process using: ${process.execPath} ${process.argv.slice(1).join(' ')}`);

            const child = spawn(process.execPath, process.argv.slice(1), {
                detached: true,
                stdio: 'inherit'
            });

            child.unref();

            console.log("New process spawned. Exiting current process.");

            process.exit(0);

        } catch (error) {
            console.error("Error during restart attempt:", error);
            const errorMessage = `Failed to initiate restart: ${error.message}`;
            if (context.channel && context.channel.send) {
               try { await context.channel.send(errorMessage); } catch {  }
            }

            process.exit(1);
        }
        return "";
    }
};