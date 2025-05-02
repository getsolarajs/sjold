const os = require('os');
module.exports = {
    name: "$platformArch", description: "Returns the OS architecture (e.g., x64). Alias for $osInfo[arch].", takesBrackets: false,
    execute: async (context, args) => { return os.arch(); }
};