module.exports = {
    name: "$emitEvent", description: "Emits a custom event with optional data. Args: eventName;[dataJson]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $emitEvent requires eventName]"; const eventName = args[0]; let data = null;
        if (args[1]) { try { data = JSON.parse(args[1]); } catch { return "[Error: Invalid data JSON]"; } }
        context.client.customEvents.emit(eventName, data, context); return "";
    }
};