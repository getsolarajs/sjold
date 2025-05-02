module.exports = {
    name: "$roleMention",
    description: "Returns the mention string (<@&ID>) for the specified role ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const roleId = args[0]?.trim();
        if (!roleId || !/^\d{17,19}$/.test(roleId)) return "[Error: $roleMention requires a valid role ID]";
        return `<@&${roleId}>`;
    }
};