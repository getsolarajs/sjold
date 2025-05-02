module.exports = {
    name: "$findUser",
    description: "Tries to find a user ID from a mention, tag, username, or ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const query = args[0]?.trim();
        if (!query) return "[Error: $findUser requires a query]";
        if (/^\d{17,19}$/.test(query)) {
            try { await context.client.users.fetch(query); return query; } catch { /* Ignore */ }
        }
        const mentionMatch = query.match(/^<@!?(\d{17,19})>$/);
        if (mentionMatch) {
            try { await context.client.users.fetch(mentionMatch[1]); return mentionMatch[1]; } catch { /* Ignore */ }
        }
        const lowerQuery = query.toLowerCase();
        let foundUser = context.client.users.cache.find(u => u.tag.toLowerCase() === lowerQuery || u.username.toLowerCase() === lowerQuery);
        if (!foundUser && context.guild) {
            try {
                const fetchedMembers = await context.guild.members.search({ query: query, limit: 5 });
                 foundUser = fetchedMembers.find(m => m.user.tag.toLowerCase() === lowerQuery || m.user.username.toLowerCase() === lowerQuery)?.user;
            } catch (searchError) { console.warn(`$findUser: Member search failed:`, searchError); }
        }
        if (foundUser) return foundUser.id;
        return `[Error: Could not resolve user "${query}"]`;
    }
};