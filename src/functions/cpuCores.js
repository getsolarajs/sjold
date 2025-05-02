const os = require('os');
module.exports = {
    name: "$cpuCores", description: "Returns the number of CPU cores available.", takesBrackets: false,
    execute: async (context, args) => { return os.cpus()?.length.toString() ?? "N/A"; }
};