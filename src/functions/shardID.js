module.exports = {
    name: "$shardID", description: "Returns the ID of the current shard.", takesBrackets: false,
    execute: async (context, args) => { return context.guild?.shardId?.toString() ?? context.client.shard?.ids[0]?.toString() ?? "0"; }
};