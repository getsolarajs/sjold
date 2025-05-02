module.exports = {
    name: "$eventData", description: "Gets raw data attached to the event context. Args: [propertyName]", takesBrackets: true,
    execute: async (context, args) => {
        const prop = args[0]; if (!prop) return "[Error: Requires property name]";
        const value = context[prop];
        if (value === undefined) return "";
        try { return typeof value === 'object' ? JSON.stringify(value) : String(value); } catch { return "[Error: Cannot stringify event data]"; }
    }
};