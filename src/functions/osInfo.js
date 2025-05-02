const os = require('os');
module.exports = {
    name: "$osInfo", description: "Gets OS information. Args: property(hostname/type/platform/arch/release/uptime/totalmem/freemem)", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires property name]";
        const prop = args[0].toLowerCase();
        try {
            switch(prop) {
                case 'hostname': return os.hostname();
                case 'type': return os.type();
                case 'platform': return os.platform();
                case 'arch': return os.arch();
                case 'release': return os.release();
                case 'uptime': return os.uptime().toString(); // System uptime in seconds
                case 'totalmem': return os.totalmem().toString(); // Bytes
                case 'freemem': return os.freemem().toString(); // Bytes
                default: return `[Error: Invalid property "${args[0]}"]`;
            }
        } catch (e) { return `[Error getting OS info: ${e.message}]`; }
    }
};