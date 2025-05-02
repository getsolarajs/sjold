module.exports = {
    name: "$messageTimestamp", description: "Returns the creation timestamp (in ms) of the triggering message.", takesBrackets: false,
    execute: async (context, args) => { return context.message?.createdTimestamp?.toString() || ""; }
};