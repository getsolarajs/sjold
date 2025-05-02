module.exports = {
    name: "$shutdown",
    description: "Shuts down the bot process completely. [EXTREMELY DANGEROUS - OWNER ONLY]",
    takesBrackets: false,
    execute: async (context, args) => {
        console.warn(`!!! BOT SHUTDOWN INITIATED BY $shutdown (User: ${context.user?.tag ?? 'Unknown'}) !!!`);
        await context.client.destroy(); 
        process.exit(0); 
        return "";
    }
};