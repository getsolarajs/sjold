const canvafy = require("canvafy");
module.exports = {
    name: "$captchaKey", description: "Generates a random captcha key. Args: [length=6]", takesBrackets: true,
    execute: async (context, args) => {
        const length = args[0] ? parseInt(args[0], 10) : 6;
        if (isNaN(length) || length < 1 || length > 20) return "[Error: Invalid captcha key length (1-20)]";
        return canvafy.Util.captchaKey(length);
    }
};