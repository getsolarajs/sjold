module.exports = {
    name: "$shardCount", description: "Returns the total number of shards for the bot.", takesBrackets: false,
    execute: async (context, args) => { return context.client.shard?.count?.toString() ?? "1"; }
};