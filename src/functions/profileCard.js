const canvafy = require("canvafy");
const { AttachmentBuilder } = require('discord.js');
module.exports = {
    name: "$profileCard", description: "Generates a basic profile card image. Args: userID;[borderColor?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires userID]"; const userId = args[0]; const border = args[1];
        if (!/^\d{17,19}$/.test(userId)) return "[Error: Invalid userID]";
        try {
            const user = await context.client.users.fetch(userId, { force: true });
            if (!user) return `[Error: User ${userId} not found]`;

            const builder = new canvafy.Profile().setUser(user.id).setActivity({activity:{
                name: 'Solara.js',
                type: 0,
                url: null,
                details: 'This thing was made with Solara.js!!',
                state: 'get it now!! https://solara.js.org',
                applicationId: '810516608442695700',
                party: null,
                assets:{
                  largeText: 'Wow! Solara.js!',
                  smallText: 'So cool!',
                  largeImage: 'mhttps://cdn.discordapp.com/icons/1361776049649745931/898fbc8a1cc646d98bd6de3ba9c191c0.png?size=1024',
                  smallImage: 'https://cdn.discordapp.com/icons/1361776049649745931/898fbc8a1cc646d98bd6de3ba9c191c0.png?size=1024'
                }},
               largeImage:"https://cdn.discordapp.com/icons/1361776049649745931/898fbc8a1cc646d98bd6de3ba9c191c0.png?size=1024"
              })
            if (border) builder.setBorder(border);
            const imageBuffer = await builder.build();
            const attachment = new AttachmentBuilder(imageBuffer, { name: `profile-${userId}.png` });
            context.attachments = context.attachments || []; context.attachments.push(attachment);
            return "";
        } catch (e) { console.error("Profile Card Error:", e); return `[Error generating profile card: ${e.message}]`; }
    }
};