module.exports = {
    name: "$searchMembers", description: "Returns semicolon-separated list of user IDs matching a query. Args: query;[limit=10]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $searchMembers requires guild context]";
        if (!args[0]) return "[Error: Requires query]";
        const query = args[0]; const limit = args[1] ? parseInt(args[1], 10) : 10;
        if (isNaN(limit) || limit < 1 || limit > 100) return "[Error: Invalid limit (1-100)]";
        try { const members = await context.guild.members.search({ query: query, limit: limit }); return members.map(m => m.id).join(';'); }
        catch { return "[Error searching members]"; }
    }
};