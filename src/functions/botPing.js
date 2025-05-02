module.exports = {
    name: "$botPing",
    description: "Returns the bot's websocket heartbeat ping in milliseconds.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.client.ws.ping.toString();
    }
};