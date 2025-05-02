module.exports = {
    name: "$randomHexColor", description: "Generates a random hex color code.", takesBrackets: false,
    execute: async (context, args) => { return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`; }
};