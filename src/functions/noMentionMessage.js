module.exports = {
    name: "$noMentionMessage", description: "Returns the command arguments ($message) without user/role/channel/everyone mentions.", takesBrackets: false,
    execute: async (context, args) => {
        const originalMessage = context.args?.join(" ") || "";
        return originalMessage
            .replace(/<@!?&?\d{17,19}>/g, '')
            .replace(/<#\d{17,19}>/g, '') 
            .replace(/@everyone/g, 'everyone') 
            .replace(/@here/g, 'here') 
            .trim();
    }
};