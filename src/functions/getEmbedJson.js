module.exports = {
    name: "$getEmbedJSON", description: "Returns the current embed data as a JSON string.", takesBrackets: false,
    execute: async (context, args) => { return JSON.stringify(context.embedData || {}); }
};