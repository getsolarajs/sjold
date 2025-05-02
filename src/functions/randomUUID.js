const crypto = require('crypto');
module.exports = {
    name: "$randomUUID", description: "Generates a random UUID.", takesBrackets: false,
    execute: async (context, args) => { return crypto.randomUUID(); }
};