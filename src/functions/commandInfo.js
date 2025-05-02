module.exports = {
    name: "$commandInfo", description: "Returns info about the currently executing command. Args: property(name/type/description/aliases)", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.command) return "[Error: Not in a command execution context]"; if (!args[0]) return "[Error: Requires property name]";
        const prop = args[0].toLowerCase();
        switch(prop) {
            case 'name': return context.command.name || "";
            case 'type': return context.command.type || "message";
            case 'description': return context.command.description || "";
            case 'aliases': return context.command.aliases?.join(';') || "";
            // Add other command object properties if needed
            default: return `[Error: Invalid property "${args[0]}"]`;
        }
    }
};