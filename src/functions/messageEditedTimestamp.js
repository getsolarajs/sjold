module.exports = {
    name: "$messageEditedTimestamp",
    description: "Returns the timestamp (in ms) when the command message was last edited, or empty if not edited.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.message?.editedTimestamp?.toString() || "";
    }
};